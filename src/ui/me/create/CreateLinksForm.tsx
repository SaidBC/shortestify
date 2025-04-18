import { Input } from "@/components/ui/input";

export default function CreateLinksForm() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-md" htmlFor="url">
          Your URL
        </label>
        <Input
          type="text"
          placeholder="Enter a url"
          name="url"
          className="bg-slate-700"
        />
      </div>
      <div>
        <p className="font-bold text-md">Includes ads ?</p>
        <div className="ml-2">
          <label className="font-bold text-md flex gap-2">
            <input type="radio" name="ads" value={"yes"} />
            <span>Yes</span>
          </label>
          <label className="font-bold text-md flex gap-2">
            <input type="radio" name="ads" value={"no"} />
            <span>No</span>
          </label>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Create Link
      </button>
    </form>
  );
}
