import UsersAccountTable from "../../components/accountsTable/accounts-table.component";
import { useEffect } from "react";
import { showNotifications } from "../../utils/notifications";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


export function UsersAccountsPage() {
    
    const userType = localStorage.getItem("userType");
    const navigate = useNavigate();
    const { token } = useAuth();

    useEffect(() => {
      if (!token) {
        showNotifications("Cannot accsess to accounts page", "warning");
        showNotifications("please signin if you have an account", "warning");
        navigate("/auth/login");
      }
      if (token) {
        if (userType === "user") {
          showNotifications("Cannot accsess to accounts page", "warning");
          navigate("/all-books");
        }
      }
    }, [navigate,token,userType]);

    
    return <UsersAccountTable />;
}
