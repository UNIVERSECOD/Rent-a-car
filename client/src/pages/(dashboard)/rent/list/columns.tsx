import { paths } from "@/constants/paths";
import rentService from "@/services/rent";
import { Rent } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CheckIcon, Edit2Icon, XIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const columns: ColumnDef<Rent>[] = [
  {
    accessorKey: "imageUrls",
    header: "Image",
    cell: (data) => {
      return (
        <img
          src={data.row.original.imageUrls?.[0]}
          alt={"Rent Picture"}
          className="w-10 h-10 object-cover rounded-lg"
        />
      );
    },
  },
  {
    accessorKey: "category.title",
    header: "Category",
  },
  {
    accessorKey: "title",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (data) => {
      return (
        <div className="truncate max-w-[200px]">
          {data.row.original.description}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (data) => {
      return (
        <div className="text-secondary-500">
          {data.row.original.price}{" "}
          <span className="text-secondary-300">
            {data.row.original.currency}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "discountPrice",
    header: "Discount",
    cell: (data) => {
      return (
        <div className="min-W-[160px]">
          {data.row.original.discountPrice || "No Discount"}
        </div>
      );
    }
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "fuel",
    header: "Fuel",
  },
  {
    accessorKey: "gear",
    header: "Gearbox",
  },
  {
    accessorKey: "showInRecommendation",
    header: "Show in Recommendation",
    cell: (data) => {
      return (
        <div>
          {data.row.original.showInRecommendation ? (
            <CheckIcon className="text-green-600" />
          ) : (
            <XIcon className="text-red-500" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: (data) => {
      return (
        <div>
          <Link to={paths.DASHBOARD.RENTS.EDIT(data.row.original._id)}>
            <Edit2Icon className="w-4 h-4" />
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => {
      const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this rent?");
        if (confirmed) {
          try {
            await rentService.deleteById(row.original._id); 
            alert("Rent deleted successfully!");
          } catch (error) {
            alert("Failed to delete location!");
          }
        }
      };

      return (
        <div>
          <XIcon
            className="w-4 h-4 cursor-pointer text-red-600"
            onClick={handleDelete}
          />
        </div>
      );
    },
  },
];
