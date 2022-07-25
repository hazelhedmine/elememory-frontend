import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Card from './Card'

describe('<Card />', () => {
  beforeEach(() => {
    render(<Card question="Initial question" answer="Initial answer"></Card>)
  })

  test('at start only question is displayed', () => {
    const question = screen.getByText('Initial question')
    expect(question).toBeDefined()
    const answer = screen.queryByText('Initial answer')
    expect(answer).toBeNull()
  })

  test('after clicking show answer button, only answer is displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show Answer')
    await user.click(button)

    const answer = screen.getByText('Initial answer')
    expect(answer).toBeDefined()
    const question = screen.queryByText('Initial question')
    expect(question).toBeNull()
  })

  test('after clicking show question button, only answer is displayed', async () => {
    const user = userEvent.setup()
    const answerBtn = screen.getByText('Show Answer')
    await user.click(answerBtn)

    let answer = screen.getByText('Initial answer')
    expect(answer).toBeDefined()
    let question = screen.queryByText('Initial question')
    expect(question).toBeNull()

    const questionBtn = screen.getByText('Show Question')
    await user.click(questionBtn)

    question = screen.getByText('Initial question')
    expect(question).toBeDefined()
    answer = screen.queryByText('Initial answer')
    expect(answer).toBeNull()
  })
})

describe('Editting <Card />', () => {
  test('suceeds when editting question', async () => {
    const { container } = render(
      <Card question="Initial question" answer="Initial answer"></Card>
    )

    const question = screen.getByText('Initial question')
    expect(question).toBeDefined()

    const user = userEvent.setup()
    const editBtn = container.querySelector('#edit-card-button')
    await user.click(editBtn)

    const cardModal = screen.getByText('Edit your card')
    expect(cardModal).toBeDefined()

    const questionInput = screen.getByText('Initial question')
    const saveButton = screen.getByText('Save')

    await user.type(questionInput, 'new question')
    await user.click(saveButton)

    const newQuestion = screen.findByText('new question')
    expect(newQuestion).toBeDefined()
  })

  test('suceeds when editting answer', async () => {
    const { container } = render(
      <Card question="Initial question" answer="Initial answer"></Card>
    )

    const user = userEvent.setup()
    const button = screen.getByText('Show Answer')
    await user.click(button)

    const answer = screen.getByText('Initial answer')
    expect(answer).toBeDefined()

    const editBtn = container.querySelector('#edit-card-button')
    await user.click(editBtn)

    const cardModal = screen.getByText('Edit your card')
    expect(cardModal).toBeDefined()

    const answerInput = screen.getByText('Initial answer')
    const saveButton = screen.getByText('Save')

    await user.type(answerInput, 'new answer')
    await user.click(saveButton)

    const newAnswer = screen.findByText('new answer')
    expect(newAnswer).toBeDefined()
  })
})
