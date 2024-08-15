import { useState } from 'react'

import {
  Form,
  FormError,
  Label,
  Submit,
  SubmitHandler,
  TextAreaField,
  TextField,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY as CommentsQuery } from 'src/components/CommentsCell'

const CREATE = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      name
      body
      createdAt
    }
  }
`

interface Props {
  postId: number
}

interface FormValues {
  name: string
  comment: string
}

const CommentForm = ({ postId }: Props) => {
  const [hasPosted, setHasPosted] = useState(false)
  const [createComment, { loading, error }] = useMutation(CREATE, {
    onCompleted: () => {
      setHasPosted(true)
      toast.success('Thank you for your comment!')
    },
    refetchQueries: [{ query: CommentsQuery, variables: { postId } }],
  })

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    createComment({ variables: { input: { postId, ...input } } })
  }

  return (
    <div className={hasPosted ? 'hidden' : ''}>
      <h3 className="text-lg font-light text-gray-600">Leave a Comment</h3>
      <Form className="mt-4 w-full" onSubmit={onSubmit}>
        <FormError
          titleClassName="font-semibold"
          wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
          error={error}
        />
        <Label className="block text-sm uppercase text-gray-600" name="name">
          Name
        </Label>
        <TextField
          className="text-ws block w-full rounded border p-1"
          name="name"
          validation={{ required: true }}
        />

        <Label
          className="mt-4 block text-sm uppercase text-gray-600"
          name="body"
        >
          Comment
        </Label>
        <TextAreaField
          className="text-ws block h-24 w-full  rounded border p-1"
          name="body"
          validation={{ required: true }}
        />

        <Submit
          className="mt-4 block rounded bg-blue-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white disabled:opacity-50"
          disabled={loading}
        >
          Submit
        </Submit>
      </Form>
    </div>
  )
}

export default CommentForm
