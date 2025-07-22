'use client'
import { handleComment } from 'app/actions/actions'
import { useRef, useTransition } from 'react'
import { toast } from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "app/components/ui/button"

const CommentForm = ({ postId, user, replyToId }) => {
  const formRef = useRef();
  let [isPending, startTransition] = useTransition();

  const onSubmit = async (formData) => {
    const comment = formData.get('comment')
    formRef.current.reset()
    startTransition(async () => {
      await handleComment(comment, postId, user, replyToId);
      toast.success("Commented");
    });
  }

  return (
    <form className="mb-6" action={onSubmit} ref={formRef}>
      <div className="py-2 px-4 mb-4 bg-white rounded-xl border border-gray-200">
        <label htmlFor="comment" className="sr-only">
          Your comment
        </label>
        <textarea
          id="comment"
          name="comment"
          rows="3"
          className="
            w-full px-0 text-sm
            bg-transparent
            border-none
            outline-none
            focus:ring-0
            text-black placeholder:text-gray-500
            rounded-md
            resize-none
          "
          placeholder="Write a comment..."
          required
        ></textarea>
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Comment"}
      </Button>
    </form>
  )
}

export default CommentForm
