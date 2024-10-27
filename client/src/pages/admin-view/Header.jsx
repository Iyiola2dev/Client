import { Button } from "@/components/ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuLogOut } from "react-icons/lu";

//The open And setOpen props are passed from the AdminLayout component and it ws passed as true when the button is clicked
const AdminHeader = ({ setOpen }) => {
  return (
    <div>
      <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
        <Button
          onClick={() => setOpen(true)}
          className="lg:hidden sm:block bg-[linear-gradient(180deg,#C42571_18%,#004DB5_80%)]"
        >
          <GiHamburgerMenu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex flex-1 justify-end">
          <Button className="inline-flex gap-2 items-center rouned-md px-4 py-2 text-sm font-medium shadow bg-[#006CFF]">
            <LuLogOut />
            Logout
          </Button>
        </div>
      </header>
    </div>
  );
};

export default AdminHeader;
