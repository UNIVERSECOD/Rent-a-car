import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "@/services/user";
import { paths } from "@/constants/paths";
import { useNavigate } from "react-router-dom";
import { AxiosResponseError } from "@/types";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Surname must be at least 2 characters.",
  }),
  avatar: z.string().optional(),
});

const EditProfileDialog: React.FC<{
  user: { name: string; username: string; avatar?: string | undefined };
}> = ({ user }) => {
  const [imagePreview, setImagePreview] = useState(user?.avatar);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username,
      name: user?.name,
      avatar: user?.avatar ?? "",
    },
  });

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: UserService.updateUser,
    onSuccess: () => {
      toast.success("User updated successfully");
      navigate(paths.HOME);
    },
    onError: (error: AxiosResponseError) => {
      toast.error(error.response?.data.message ?? "Something went wrong");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutateUpdate(values);
    setIsOpen(false);
  }

  useEffect(() => {
    if (user?.avatar) {
      setImagePreview(user.avatar);
    }
  }, [user]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Surname..."
                        defaultValue={user?.username}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {imagePreview ? (
                <div className="relative h-24 w-fit mx-auto">
                  <img src={imagePreview} alt="Post" className="h-full" />
                  <XIcon
                    onClick={() => setImagePreview(undefined)}
                    className="absolute right-0 top-0 cursor-pointer text-destructive"
                  />
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="avatar"
                  render={() => (
                    <FormItem>
                      <FormLabel>Post Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(e) => {
                            if (e.target && e.target.files) {
                              const file = e.target.files[0];
                              if (file) {
                                const url = URL.createObjectURL(file);  // Preview the file
                                form.setValue("avatar", url);  // Set the URL
                                setImagePreview(url);  // Preview the file
                              }
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
