import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Truck from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import HomeMaxIcon from "@mui/icons-material/HomeMax";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import ImageIcon from "@mui/icons-material/Image";
import PieChartIcon from "@mui/icons-material/PieChart";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
  Dashboard,
  InventoryTwoTone,
  ShoppingCart,
  AdminPanelSettings,
  LocalShipping,
} from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { useState } from "react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { AiOutlineUnorderedList } from "react-icons/ai";
import InsightsIcon from "@mui/icons-material/Insights";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import {
  Store,
  ShopTwo,
  Person,
  Category,
  Inventory,
  FmdGood,
  Settings,
  ListAlt,
} from "@mui/icons-material";
import "../Styling/SidebarStyle.css";
import ListItemComp from "../customComponents/ListItem";
import MenuItemComp from "../customComponents/MenuItemComp";
import AnalyticsIcon from "../CustomIcons/AnalyticsIcon";
const drawerWidth = 240;

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOrderClosed, setIsOrderClosed] = useState(false);
  const [isInvClosed, setIsInvClosed] = useState(false);
  const [isAdminClosed, setIsAdminClosed] = useState(false);
  const [isProdClosed, setIsProdClosed] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (path) => {
    setSelectedItem(path);
    navigate(path); // Navigate to the clicked path
  };

  const handleOrderCollapse = () => {
    setIsOrderClosed(!isOrderClosed);
  };

  const handleInvCollapse = () => {
    setIsInvClosed(!isInvClosed);
  };

  const handleAdminCollapse = () => {
    setIsAdminClosed(!isAdminClosed);
  };

  const handleProdCollapse = () => {
    setIsProdClosed(!isProdClosed);
  };

  return (
    <div className="customdrawer">
      <ul className="sidebar" style={{ height: 120 + "vh" }}>
        <MenuItemComp
          icon={<Dashboard />}
          listName="Dashboard"
          isSelected={selectedItem === "/dashboard"}
          path="/dashboard"
          onMenuClick={handleItemClick}
        />

        {/* Analaytics */}

        <MenuItemComp
          icon={<AnalyticsIcon />}
          listName="Analytics"
          icon2={isOrderClosed ? <ExpandLess /> : <ExpandMore />}
          path="order"
          onMenuClick={handleOrderCollapse}
        />

        <Collapse in={isOrderClosed} timeout="auto" unmountOnExit>
          <ListItemComp
            icon={<InsightsIcon />}
            dynamicText="Historical Data Analysis"
            path="/dataAnalytics"
            isSelected={selectedItem === "/dataAnalytics"}
            onItemClick={handleItemClick}
          />

          <ListItemComp
            icon={<PieChartIcon />}
            dynamicText="Predictive Analytics"
            path="/predectiveAnalysis"
            isSelected={selectedItem === "/predectiveAnalysis"}
            onItemClick={handleItemClick}
          />
        </Collapse>
        {/* Analytics */}

        {/* Media List */}
        <MenuItemComp
          icon={<PermMediaIcon />}
          listName="Media"
          icon2={isProdClosed ? <ExpandLess /> : <ExpandMore />}
          path="candp"
          onMenuClick={handleProdCollapse}
        />

        <Collapse in={isProdClosed} timeout="auto" unmountOnExit>
          <ListItemComp
            icon={<TextSnippetIcon />}
            dynamicText="TextData"
            path="/TextData"
            isSelected={selectedItem === "/TextData"}
            onItemClick={handleItemClick}
          />

          <ListItemComp
            icon={<OndemandVideoIcon />}
            dynamicText="Videos"
            path="/viewVideo"
            isSelected={selectedItem === "/viewVideo"}
            onItemClick={handleItemClick}
          />

          <ListItemComp
            icon={<AudiotrackIcon />}
            dynamicText="Audios"
            path="/category"
            isSelected={selectedItem === "/category"}
            onItemClick={handleItemClick}
          />

          <ListItemComp
            icon={<ImageIcon />}
            dynamicText="Images"
            path="/viewImages"
            isSelected={selectedItem === "/viewImages"}
            onItemClick={handleItemClick}
          />
        </Collapse>

        {/* Media List */}

        {/* Devices List */}

        <MenuItemComp
          icon={<DevicesOtherIcon />}
          listName="Devices"
          icon2={isInvClosed ? <ExpandLess /> : <ExpandMore />}
          path="iandl"
          onMenuClick={handleInvCollapse}
        />

        <Collapse in={isInvClosed} timeout="auto" unmountOnExit>
          <ListItemComp icon={<HomeMaxIcon />} dynamicText="IntelliFridge" />

          <ListItemComp icon={<AdUnitsIcon />} dynamicText="FireSafe 5000" />
        </Collapse>

        {/* Devices List */}

        {/* Admin Part */}

        <MenuItemComp
          icon={<AdminPanelSettings />}
          listName="Admin"
          icon2={isAdminClosed ? <ExpandLess /> : <ExpandMore />}
          path="admin"
          onMenuClick={handleAdminCollapse}
        />

        <Collapse in={isAdminClosed} timeout="auto" unmountOnExit>
          <ListItemComp
            icon={<Settings />}
            dynamicText="Settings"
            path="/settings"
            isSelected={selectedItem === "/settings"}
            onItemClick={handleItemClick}
          />

          <ListItemComp
            icon={<Person />}
            dynamicText="Users"
            path="/users"
            isSelected={selectedItem === "/users"}
            onItemClick={handleItemClick}
          />

          <ListItemComp
            icon={<AdminPanelSettingsIcon />}
            dynamicText="Create Admin"
            path="/CreateAdmin"
            isSelected={selectedItem === "/CreateAdmin"}
            onItemClick={handleItemClick}
          />
        </Collapse>
      </ul>
    </div>
  );
}
