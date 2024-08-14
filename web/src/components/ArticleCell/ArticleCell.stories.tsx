import type { StoryObj } from '@storybook/react'

import { Loading, Empty, Failure, Success } from './ArticleCell'
import { standard } from './ArticleCell.mock'

export const loading: StoryObj<typeof Loading> = {
  render: () => {
    return Loading ? <Loading /> : <></>
  },
}

export const empty: StoryObj<typeof Empty> = {
  render: () => {
    return Empty ? <Empty /> : <></>
  },
}

export const failure: StoryObj<typeof Failure> = {
  render: (args) => {
    return Failure ? <Failure error={new Error('Oh no')} {...args} /> : <></>
  },
}

export const success: StoryObj<typeof Success> = {
  render: () => {
    return Success ? <Success article={standard().article} /> : null
  },
}

export default { title: 'Cells/ArticleCell' }
