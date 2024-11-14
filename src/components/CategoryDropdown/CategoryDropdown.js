"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function CategoryDropdown({ categories }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSelectCategory(category) {
    console.log(category);
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <Select onValueChange={handleSelectCategory}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={undefined}>All</SelectItem>
        {categories.map((data) => (
          <SelectItem key={data._id} value={data._id}>
            {data.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}