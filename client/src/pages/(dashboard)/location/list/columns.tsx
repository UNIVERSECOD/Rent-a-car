import { paths } from "@/constants/paths";
import locationService from "@/services/location";
import { Location } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CheckIcon, Edit2Icon, XIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const columns: ColumnDef<Location>[] = [

  {
    accessorKey: "title",
    header: "Name",
  },  
  {
    accessorKey: "",
    header: "Actions",
    cell: (data) => {
      return (
        <div>
          <Link to={paths.DASHBOARD.LOCATIONS.EDIT(data.row.original._id)}>
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
        const confirmed = window.confirm("Are you sure you want to delete this location?");
        if (confirmed) {
          try {
            await locationService.remove(row.original._id); 
            alert("Location deleted successfully!");
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