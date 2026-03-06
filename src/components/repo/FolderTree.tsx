import { FolderTree as FolderTreeIcon } from 'lucide-react';
import TreeItem from "./TreeItem";

export default function FolderTree({ structure }: any) {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <FolderTreeIcon size={22} className="text-blue-500" />
        <h2 className="text-xl font-semibold text-white">
          Folder Structure
        </h2>
      </div>

      <p className="text-sm text-slate-400">
        Hover over the ⓘ icons to learn what each folder or file is for.
      </p>

      {/* Container */}
      <div className="border border-slate-700 rounded-2xl p-6 bg-slate-900/40 backdrop-blur">
        {structure.map((item: any) => (
          <TreeItem key={item.name} item={item} />
        ))}
      </div>

    </div>
  );
}