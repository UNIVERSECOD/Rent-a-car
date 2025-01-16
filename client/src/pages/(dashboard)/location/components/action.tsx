import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { QUERY_KEYS } from "@/constants/query-keys";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { MAX_FILE_SIZE } from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";
import locationService from "@/services/location";
import categoryService from "@/services/category";
import rentService from "@/services/rent";
import { toast } from "sonner";
import { paths } from "@/constants/paths";
import { error } from "console";
import { AxiosError } from "axios";
import { AxiosResponseError } from "@/types";
import { RenderIf } from "@/components/shared/RenderIf";

const getFormSchema = (isEdit: boolean) =>
  z.object({
    title: z.string().min(2),
    });

type Props = {
  type: "create" | "update";
};



const ActionForm = ({ type }: Props) => {
  const isEdit = type === "update";
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.ADMIN_LOCATION_BY_ID, id],
    queryFn: () => locationService.getById(id!),
    enabled: isEdit,
  });

  const editItem = data?.data.item || null;

  console.log("Edit item: ", editItem);
  

   

  const { mutate: mutateCreate } = useMutation({
    mutationFn: locationService.create,
    onSuccess: () => {
      toast.success("Location created successfully");
      navigate(paths.DASHBOARD.LOCATIONS.LIST);
    },
    onError: (error: AxiosResponseError) => {
      toast.error(error.response?.data.message ?? "Something went wrong");
    },
  });

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: locationService.edit,
    onSuccess: () => {
      toast.success("Location updated successfully");
      navigate(paths.DASHBOARD.LOCATIONS.LIST);
    },
    onError: (error: AxiosResponseError) => {
      toast.error(error.response?.data.message?? "Something went wrong");
    },
  })

  const { data: locationData } = useQuery({
    queryKey: [QUERY_KEYS.LOCATIONS],
    queryFn: locationService.getAll,
  });




  const formSchema = useMemo(() => getFormSchema(isEdit), [isEdit]);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (editItem) {
      form.setValue("title", editItem.title);
    }
  }, [editItem]);

  function onSubmit(values: z.infer<typeof formSchema>) {
      const data = {
        title: values.title,
      };
      console.log("onSubmit", data);
      
      if (type === "create") {
        mutateCreate(data);
      }else{
        mutateUpdate({
          id: id!,
          data
      });
      }
  }

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-primary mb-4">Create Location</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Baku" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>    
             
          <div className="flex justify-end mt-4">
            <Button asChild variant="secondary">
              <Link to="/dashboard/rents" className="mr-2">
                Back
              </Link>
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ActionForm;
