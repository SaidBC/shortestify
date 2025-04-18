import { logout } from "@/lib/actions";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LogoutForm() {
  return (
    <form action={logout}>
      <button className="flex font-bold items-center gap-2 pl-16 w-full text-center py-3 rounded-lg bg-red-600">
        <FontAwesomeIcon icon={faRightFromBracket} />
        <span>Logout</span>
      </button>
    </form>
  );
}
