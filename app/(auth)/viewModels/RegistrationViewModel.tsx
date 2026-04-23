import BottomLogInMenu from "@/src/components/auth/views/BottomLogInMenu";
import ContinueWithGmailAndPasswors from "@/src/components/auth/views/ContinueWithGmailAndPasswors";
import React, { useState } from "react";

export function RegistrationViewModel() {
  const [activeBottomView, setActiveBottomView] = useState<
    "Gmail_Password_View" | "Welcome_View"
  >("Welcome_View");

  const handleView = (View: "Gmail_Password_View" | "Welcome_View") => {
    setActiveBottomView(View);
  };

  const ActiveView = () => {
    switch (activeBottomView) {
      case "Gmail_Password_View":
        return <ContinueWithGmailAndPasswors handleView={handleView} />;
      case "Welcome_View":
        return <BottomLogInMenu handleView={handleView} />;
      default:
        return null;
    }
  };

  return {
    ActiveView,
  };
}
