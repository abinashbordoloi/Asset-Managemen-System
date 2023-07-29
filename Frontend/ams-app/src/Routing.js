import React from "react";
import { Route, Routes } from "react-router-dom";
import AssetEntryScreen from "./components/Screens/AssetEntryScreen";
import SupplyOrderScreen from "./components/Screens/SupplyOrderScreen";
import AddAssetScreen from "./components/Screens/AddAssetScreen";
import UserScreen from "./components/Screens/UserScreen";
import LocationScreen from "./components/Screens/LocationScreen";
import Category from "./components/Screens/Category";
import Challan from "./components/Screens/Challan";
import Description from "./components/Screens/Description";
import Installation from "./components/Screens/Installation";
import Insurance from "./components/Screens/Insurance";
import Invoice from "./components/Screens/Invoice";
import PhysicalStatus from "./components/Screens/PhysicalStatus";
import Procurement from "./components/Screens/Procurement";
import TaggingStatus from "./components/Screens/TaggingStatus";
import Vendor from "./components/Screens/Vendor";
import LocationForm from "./components/Screens/LocationForm";
import CategoryForm from "./components/Screens/CategoryForm";
import ChallanForm from "./components/Screens/ChallanForm";
import DescriptionForm from "./components/Screens/DescriptionForm";
import InstallationForm from "./components/Screens/InstallationForm";
import InsuranceForm from "./components/Screens/InsuranceForm";
import InvoiceForm from "./components/Screens/InvoiceForm";
import VendorForm from "./components/Screens/VendorForm";
import TaggingStatusForm from "./components/Screens/TaggingStatusForm";
import ProcurementForm from "./components/Screens/ProcurementForm";
import PhysicalStatusForm from "./components/Screens/PhysicalStatusForm";
import SupplyOrderForm from "./components/Screens/SupplyOrderForm";
const routes = () => {
  return (
    <Routes>
      <Route path="/asset" element={<AssetEntryScreen />} />
      <Route path="/add-asset" element={<AddAssetScreen />} />
      <Route path="/user" element={<UserScreen />} />
      <Route path="/supply-order" element={<SupplyOrderScreen />} />
      <Route path="/location" element={<LocationScreen />} />
      <Route path="/category" element={<Category />} />
      <Route path="/challan" element={<Challan />} />
      <Route path="/description" element={<Description />} />
      <Route path="/installation" element={<Installation />} />
      <Route path="/insurance" element={<Insurance />} />
      <Route path="/invoice" element={<Invoice />} />
      <Route path="/physicalstatus" element={<PhysicalStatus />} />
      <Route path="/procurement" element={<Procurement />} />
      <Route path="/taggingstatus" element={<TaggingStatus />} />
      <Route path="/vendor" element={<Vendor />} />
      <Route path="/add-category" element={<CategoryForm />} />
      <Route path="/add-location" element={<LocationForm />} />
      <Route path="/add-challan" element={<ChallanForm />} />
      <Route path="/add-description" element={<DescriptionForm />} />
      <Route path="/add-installation" element={<InstallationForm />} />
      <Route path="/add-insurance" element={<InsuranceForm />} />
      <Route path="/add-invoice" element={<InvoiceForm />} />
      <Route path="/add-physical-status" element={<PhysicalStatusForm />} />
      <Route path="/add-procurement" element={<ProcurementForm />} />
      <Route path="/add-tagging-status" element={<TaggingStatusForm />} />
      <Route path="/add-vendor" element={<VendorForm />} />
      <Route path="/add-supply-order" element={<SupplyOrderForm />} />
    </Routes>
  );
};

export default routes;
