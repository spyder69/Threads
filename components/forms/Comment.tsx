"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// import { updateUser } from "@/lib/actions/user.action";
import { CommmentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.action";
// import { createThread } from "@/lib/actions/thread.action";

interface props {
    threadId : string;
    currentUserImg : string;
    currentUserId : string;
}

const Comment = ({
    threadId,
    currentUserImg,
    currentUserId,
} : props) => {

  const router = useRouter();
  const pathname = usePathname();
  const form = useForm({
    resolver: zodResolver(CommmentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommmentValidation>) => {
    await addCommentToThread(threadId, values.thread , JSON.parse(currentUserId), pathname);
    

    form.reset();
  }
  return (
    <Form {...form}>
      <form
        className="comment-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full items-center gap-3'>
              <FormLabel>
                <Image 
                src={currentUserImg}
                alt="Profile Image"
                width={48}
                height={48}
                className="rounded-full object-contain"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent" >
                <Input
                  type="text"
                  placeholder="comment..."
                  className="no-focus text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' className="comment-form_btn">
            Reply
        </Button>
      </form>
    </Form>
  )
}

export default Comment