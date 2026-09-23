import './presentation/styles.css'
import { slides } from './presentation/slides'
import { createStage } from './presentation/stage'

declare const __SINGLE__: boolean

createStage(slides, __SINGLE__ ? 'single' : 'full')
