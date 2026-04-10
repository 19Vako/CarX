import { RootState } from "@/src/store/store";
import { useSelector } from "react-redux";

export function ProfileSectionViewModel() {
  const user = useSelector((state: RootState) => state.user);

  return {
    userImage: user.photoURL || "",
    userName: user.name,
    userEmail: user.email,
  };
}
