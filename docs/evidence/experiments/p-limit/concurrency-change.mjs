import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';

const defaultSource = new URL('../../../../tmp/p-limit/index.js', import.meta.url);
const source = process.env.P_LIMIT_SOURCE
	? pathToFileURL(process.env.P_LIMIT_SOURCE)
	: defaultSource;
const {default: pLimit} = await import(source.href);

const limit = pLimit(3);
const events = [];
const controls = new Map();

const snapshot = (event, task) => ({
	event,
	task,
	activeCount: limit.activeCount,
	pendingCount: limit.pendingCount,
	concurrency: limit.concurrency,
});

const tasks = Array.from({length: 5}, (_, index) => {
	const task = index + 1;
	return limit(async () => {
		events.push(snapshot('start', task));
		await new Promise(resolve => {
			controls.set(task, resolve);
		});
		events.push(snapshot('end', task));
		return task;
	});
});

const tick = () => new Promise(resolve => setImmediate(resolve));

await tick();
events.push(snapshot('initial-capacity-reached', null));
assert.deepEqual(events.filter(item => item.event === 'start').map(item => item.task), [1, 2, 3]);
assert.equal(limit.activeCount, 3);
assert.equal(limit.pendingCount, 2);

limit.concurrency = 1;
await tick();
events.push(snapshot('lowered-to-one', null));
assert.equal(limit.activeCount, 3, 'lowering concurrency must not cancel active tasks');

controls.get(1)();
await tick();
events.push(snapshot('after-task-1', null));
assert.equal(limit.activeCount, 2);
assert.equal(limit.pendingCount, 2);

controls.get(2)();
await tick();
events.push(snapshot('after-task-2', null));
assert.equal(limit.activeCount, 1);
assert.equal(limit.pendingCount, 2);

controls.get(3)();
await tick();
events.push(snapshot('after-task-3', null));
assert.equal(limit.activeCount, 1);
assert.equal(limit.pendingCount, 1);
assert.deepEqual(events.filter(item => item.event === 'start').map(item => item.task), [1, 2, 3, 4]);

controls.get(4)();
await tick();
events.push(snapshot('after-task-4', null));
assert.equal(limit.activeCount, 1);
assert.equal(limit.pendingCount, 0);

controls.get(5)();
const results = await Promise.all(tasks);
await tick();
events.push(snapshot('complete', null));
assert.deepEqual(results, [1, 2, 3, 4, 5]);
assert.equal(limit.activeCount, 0);
assert.equal(limit.pendingCount, 0);

const report = {
	source: process.env.P_LIMIT_SOURCE ?? 'tmp/p-limit/index.js',
	question: 'What happens when concurrency is lowered below activeCount?',
	observed: {
		activeTasksCancelled: false,
		queuedTaskStartedWhileActiveCountAtOrAboveNewLimit: false,
		queuedTasksResumeWhenActiveCountDropsBelowNewLimit: true,
	},
	events,
	passed: true,
};

const output = new URL('./runtime-report.json', import.meta.url);
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
