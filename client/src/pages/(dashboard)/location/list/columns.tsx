import { paths } from "@/constants/paths";
import { Rent } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CheckIcon, Edit2Icon, XIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const columns: ColumnDef<Rent>[] = [

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
    cell: () => {
      return (
        <div>
          <XIcon className="w-4 h-4" />
          {/* <Link to={paths.DASHBOARD.RENTS.EDIT(data.row.original._id)}>
            <XIcon className="w-4 h-4" />
          </Link> */}
        </div>
      );
    },
  },
];
