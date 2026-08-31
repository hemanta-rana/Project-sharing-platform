"use client";

import { OrganizationSwitcher, UserButton, useUser } from "@clerk/nextjs";
import { BuildingIcon, SettingsIcon } from "lucide-react";

export default function CustomUserButton() {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.isAdmin === true;

  return (
    <UserButton>
      {isAdmin && (
        <UserButton.MenuItems>
          <UserButton.Link
            label="Admin Panel"
            labelIcon={<SettingsIcon className="size-4" />}
            href="/admin"
          />
        </UserButton.MenuItems>
      )}
      
      <UserButton.UserProfilePage
        label="Organization"
        labelIcon={<BuildingIcon className="size-4" />}
        url="organization"
      >
        <div className="p-4">
          <h2>Manage Organization</h2>
          <OrganizationSwitcher
            hidePersonal={true}
            afterCreateOrganizationUrl={"/submit"}
            afterSelectPersonalUrl={"/submit"}
            appearance={{
              elements: {
                rootBox: "w-full",
              },
            }}
          />
        </div>
      </UserButton.UserProfilePage>
    </UserButton>
  );
}
