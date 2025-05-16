import * as React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import FaceIcon from "@mui/icons-material/Face";
import { BookOpenCheck, ChartColumnStacked, LogOutIcon } from "lucide-react";
import { BookX } from "lucide-react";
import { Star } from "lucide-react";
import { authServices } from "../../ services/api/authServices";
import { showNotifications } from "../../utils/notifications";
import { useAuth } from "../../context/AuthContext";
import { People } from "@mui/icons-material";

type SidebarContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const SidebarContext = React.createContext<
  SidebarContextType | undefined
>(undefined);

// interface ChildrenComponent
// {
//     children? : React.ReactNode
// }

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  position: "relative",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export function Layout() {
  const theme = useTheme();
  const userType = localStorage.getItem("userType");
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    const response = await authServices.Logout(setToken);
    if (response?.status === 200) {
      showNotifications("Logout succses", "success");
      navigate(`/all-books`);
    }
  };
  const menuItems = [
    {
      text: "ALL BOOKS",
      link: "/all-books/booksType/books",
      icon: <AutoStoriesOutlinedIcon sx={{ color: "#455769" }} />,
    },
  ];
  if(token){
    menuItems.push( {
      text: "MY READ BOOKS",
      link: "/all-books/booksType/readBooks",
      icon: <BookOpenCheck style={{ color: "#455769" }} />,
    },
    {
      text: "MY UNREAD BOOKS",
      link: "/all-books/booksType/unReadBooks",
      icon: <BookX style={{ color: "#455769" }} />,
    },
    // { text: 'الكتب التي تم تقييمها', link: '/all-books', icon: <Star style={{ color: "#455769" }} /> },
    {
      text: "MY FAVORITE BOOKS",
      link: "/all-books/booksType/favoriteBooks",
      icon: <Star style={{ color: "#455769" }} />,
    },)
  }
    // إضافة خيار "حسابات المستخدمين" فقط إذا كان المستخدم admin أو owner
    if (token &&(userType === "admin" || userType === "owner")) {
      menuItems.push({
        text: "users accounts ",
        link: "/users-accounts",
        icon: <FaceIcon sx={{ color: "#455769" }} />,
      });
      menuItems.push({
        text: "authors accounts ",
        link: "/authors",
        icon: <People sx={{ color: "#455769" }} />,
      });
      menuItems.push({
        text: "categories ",
        link: "/categories",
        icon: <ChartColumnStacked style={{ color: "#455769"}} />,
      });
    }

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <Box sx={{ display: "flex", bgcolor: theme.palette.background.default }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ bgcolor: theme.palette.primary.main }}
          open={open}
        >
          <Toolbar>
            <Link
              to="/all-books"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                style={{ width: 260, height: 73 }}
                src="/logo.png"
                alt="Book corner Avatar"
              />
            </Link>
            <Typography
              variant="h6"
              noWrap
              sx={{ flexGrow: 1 }}
              component="div"
            ></Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              {token ? (
                <>
                  <Tooltip title="Profile">
                    <Link
                      to="/profile"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <IconButton color="inherit">
                        <AccountCircleIcon />
                      </IconButton>
                    </Link>
                  </Tooltip>

                  <Tooltip title="Logout">
                    <IconButton onClick={handleLogout} color="inherit">
                      <LogOutIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button color="inherit">Login</Button>
                  </Link>
                  <Link
                    to="/auth/sign-up"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button color="inherit">Sign Up</Button>
                  </Link>
                </>
              )}
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={[open && { display: "none" }]}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Main open={open}>
          <DrawerHeader />
          <Outlet />
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List sx={{ direction: "rlt" }}>
            {menuItems.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: "block", textAlignLast: "end" }}
              >
                <Link
                  to={item.link}
                  style={{ textDecoration: "none", color: "#455769" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 1.5,
                      py: 1.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "end",
                      }}
                    >
                      {item.icon} {/* Render the icon component */}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </SidebarContext.Provider>
  );
}
