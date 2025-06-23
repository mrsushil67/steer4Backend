const sequelize = require('../config/databaseConnection');
var DataTypes = require("sequelize").DataTypes;
var _Accident = require("./Accident");
var _AccidentVehiceImages = require("./AccidentVehiceImages");
var _AccidentVehicle = require("./AccidentVehicle");
var _Action = require("./Action");
var _AttendanceMode = require("./AttendanceMode");
var _Attnder = require("./Attnder");
var _AuthorizedAttender = require("./AuthorizedAttender");
var _BIllingDsrDetails = require("./BIllingDsrDetails");
var _BankDetails = require("./BankDetails");
var _BaseRate = require("./BaseRate");
var _BillingCycle = require("./BillingCycle");
var _BlueDartAdhocTrip = require("./BlueDartAdhocTrip");
var _BuType = require("./BuType");
var _CREDITIRNDetails = require("./CREDITIRNDetails");
var _CRImage = require("./CRImage");
var _CashRequest = require("./CashRequest");
var _City_State = require("./City_State");
var _ControlRoute = require("./ControlRoute");
var _Country = require("./Country");
var _CustAddress = require("./CustAddress");
var _CustDiscount = require("./CustDiscount");
var _CustInvMap = require("./CustInvMap");
var _CustRateMap = require("./CustRateMap");
var _CustRouteMap = require("./CustRouteMap");
var _CustomerMaster = require("./CustomerMaster");
var _CustomerSac = require("./CustomerSac");
var _CustomerSeviceType = require("./CustomerSeviceType");
var _CustomerType = require("./CustomerType");
var _DSLRateRevise = require("./DSLRateRevise");
var _DSalUpdates = require("./DSalUpdates");
var _DailyRateRevise = require("./DailyRateRevise");
var _Dealer = require("./Dealer");
var _DebitCreditNote = require("./DebitCreditNote");
var _DebitReason = require("./DebitReason");
var _DebitType = require("./DebitType");
var _DeletedTrips = require("./DeletedTrips");
var _DepoMaster = require("./DepoMaster");
var _DieselAdjustment = require("./DieselAdjustment");
var _DieselDiscount = require("./DieselDiscount");
var _DieselSlip = require("./DieselSlip");
var _Docket = require("./Docket");
var _DocketPackage = require("./DocketPackage");
var _Driver = require("./Driver");
var _DriverAccount = require("./DriverAccount");
var _DriverAssigntToVehicle = require("./DriverAssigntToVehicle");
var _DriverAttendance = require("./DriverAttendance");
var _DriverAvailable = require("./DriverAvailable");
var _DriverBacklog = require("./DriverBacklog");
var _DriverBlock = require("./DriverBlock");
var _DriverBlockDetails = require("./DriverBlockDetails");
var _DriverCredits = require("./DriverCredits");
var _DriverDebits = require("./DriverDebits");
var _DriverDeleteAttendace = require("./DriverDeleteAttendace");
var _DriverDoc = require("./DriverDoc");
var _DriverImp = require("./DriverImp");
var _DriverLadgerAmount = require("./DriverLadgerAmount");
var _DriverSalDeduction = require("./DriverSalDeduction");
var _DriverSalary = require("./DriverSalary");
var _DsrBlock = require("./DsrBlock");
var _DummyDriverStl = require("./DummyDriverStl");
var _DummyTripSheet = require("./DummyTripSheet");
var _EmpDet = require("./EmpDet");
var _EmpSalary = require("./EmpSalary");
var _Emp_Attend = require("./Emp_Attend");
var _Emp_Bank = require("./Emp_Bank");
var _Emp_Doc = require("./Emp_Doc");
var _EmployeeMaster = require("./EmployeeMaster");
var _ExpenseCategory = require("./ExpenseCategory");
var _FSCalc = require("./FSCalc");
var _FastTag = require("./FastTag");
var _FinisherList = require("./FinisherList");
var _Food_Details = require("./Food_Details");
var _FscRoute = require("./FscRoute");
var _FuleCharge = require("./FuleCharge");
var _Gtax = require("./Gtax");
var _HR_Dept = require("./HR_Dept");
var _Hr_Jobs = require("./Hr_Jobs");
var _Hr_Leave_Master = require("./Hr_Leave_Master");
var _Hr_Leave_Mode = require("./Hr_Leave_Mode");
var _Hr_Leave_Register = require("./Hr_Leave_Register");
var _Hr_Leave_Transaction = require("./Hr_Leave_Transaction");
var _Hr_Leave_type = require("./Hr_Leave_type");
var _Hr_Locations = require("./Hr_Locations");
var _IRNDetails = require("./IRNDetails");
var _ImpAmountReq = require("./ImpAmountReq");
var _ImpBank = require("./ImpBank");
var _ImpTransaction = require("./ImpTransaction");
var _ImpTransactionDetails = require("./ImpTransactionDetails");
var _ImpTransactionDetailsExp = require("./ImpTransactionDetailsExp");
var _InvType = require("./InvType");
var _InvoiceDetail = require("./InvoiceDetail");
var _InvoiceMaster = require("./InvoiceMaster");
var _InvoiceTotalDetail = require("./InvoiceTotalDetail");
var _IssueBoardStatus = require("./IssueBoardStatus");
var _IssueCat = require("./IssueCat");
var _IssueCurrentStatus = require("./IssueCurrentStatus");
var _IssueSubCat = require("./IssueSubCat");
var _IssueSubCatold = require("./IssueSubCatold");
var _IssueTicket = require("./IssueTicket");
var _IssueTicketSubCat = require("./IssueTicketSubCat");
var _LegalVehicleImages = require("./LegalVehicleImages");
var _MarketCust = require("./MarketCust");
var _MarketRoute = require("./MarketRoute");
var _MilkRTInVDet = require("./MilkRTInVDet");
var _MisDiesel = require("./MisDiesel");
var _MplFsc = require("./MplFsc");
var _Notification = require("./Notification");
var _OfficeMaster = require("./OfficeMaster");
var _OldTripSettlement = require("./OldTripSettlement");
var _OnRouteExp = require("./OnRouteExp");
var _OnRouteTouchingPoint = require("./OnRouteTouchingPoint");
var _OnRouteTripAmend = require("./OnRouteTripAmend");
var _OtherDriverDebit = require("./OtherDriverDebit");
var _PackingMethods = require("./PackingMethods");
var _PaymentMode = require("./PaymentMode");
var _PaymentReciept = require("./PaymentReciept");
var _PaymentRecieptTrans = require("./PaymentRecieptTrans");
var _PlanCat = require("./PlanCat");
var _PlaneCategories = require("./PlaneCategories");
var _PodDocument = require("./PodDocument");
var _PodVerify = require("./PodVerify");
var _PumpDetails = require("./PumpDetails");
var _RTInVDet = require("./RTInVDet");
var _RatePerKM = require("./RatePerKM");
var _RateUpdtRecords = require("./RateUpdtRecords");
var _Reconciliation_Remark = require("./Reconciliation_Remark");
var _Rent_Details = require("./Rent_Details");
var _RouteCategory = require("./RouteCategory");
var _RouteDriverMap = require("./RouteDriverMap");
var _RouteDummy = require("./RouteDummy");
var _RouteMaster = require("./RouteMaster");
var _RouteRate = require("./RouteRate");
var _RouteRateValidation = require("./RouteRateValidation");
var _RouteTripMap = require("./RouteTripMap");
var _Salary = require("./Salary");
var _SaleValue = require("./SaleValue");
var _ScheduleWithTicket = require("./ScheduleWithTicket");
var _ServiceTracking = require("./ServiceTracking");
var _ServiceTrackingTrans = require("./ServiceTrackingTrans");
var _SettleStatus = require("./SettleStatus");
var _Shop_Master = require("./Shop_Master");
var _StdDieselDipo = require("./StdDieselDipo");
var _StdExpStamp = require("./StdExpStamp");
var _StdExpenses = require("./StdExpenses");
var _StdForControl = require("./StdForControl");
var _StdTat = require("./StdTat");
var _SubDipo = require("./SubDipo");
// var _TABLE 124 = require("./TABLE 124");
// var _TABLE 138 = require("./TABLE 138");
// var _TABLE 146 = require("./TABLE 146");
// var _TABLE 148 = require("./TABLE 148");
// var _TABLE 186 = require("./TABLE 186");
var _TallyLedger = require("./TallyLedger");
var _TatDummy = require("./TatDummy");
var _Taxes = require("./Taxes");
var _TouchPoints = require("./TouchPoints");
var _TouchPointsTiming = require("./TouchPointsTiming");
var _TripAdvance = require("./TripAdvance");
var _TripAmendReason = require("./TripAmendReason");
var _TripCharges = require("./TripCharges");
var _TripControl = require("./TripControl");
var _TripInvStat = require("./TripInvStat");
var _TripNature = require("./TripNature");
var _TripOperation = require("./TripOperation");
var _TripPlan = require("./TripPlan");
var _TripPlanAmend = require("./TripPlanAmend");
var _TripPlanAmend2 = require("./TripPlanAmend2");
var _TripPlanSchedule = require("./TripPlanSchedule");
var _TripSettlement = require("./TripSettlement");
var _TripSettlement2 = require("./TripSettlement2");
var _TripStatus = require("./TripStatus");
var _TripType = require("./TripType");
var _TuchingOrder = require("./TuchingOrder");
var _UserType = require("./UserType");
var _Users = require("./Users");
var _VMTicketTrack = require("./VMTicketTrack");
var _VehDummy = require("./VehDummy");
var _VehicelDepo = require("./VehicelDepo");
var _Vehicle = require("./Vehicle");
var _VehicleAssignToCust = require("./VehicleAssignToCust");
var _VehicleAvailable = require("./VehicleAvailable");
var _VehicleBacklog = require("./VehicleBacklog");
var _VehicleCapacity = require("./VehicleCapacity");
var _VehicleDebit = require("./VehicleDebit");
var _VehicleImages = require("./VehicleImages");
var _VehicleLength = require("./VehicleLength");
var _VehicleStatus = require("./VehicleStatus");
var _Vehiclesize = require("./Vehiclesize");
var _VehilceCredit = require("./VehilceCredit");
var _VendorDetails = require("./VendorDetails");
var _VendorDiesel = require("./VendorDiesel");
var _VendorDieselVucher = require("./VendorDieselVucher");
var _VendorMaster = require("./VendorMaster");
var _VendorType = require("./VendorType");
var _VentureDoc = require("./VentureDoc");
var _VoucherImages = require("./VoucherImages");
var _WorkDoneBY = require("./WorkDoneBY");
var _Work_details = require("./Work_details");
var _advdummy = require("./advdummy");
var _city = require("./city");
var _leagel = require("./leagel");
var _main_manus = require("./main_manus");
var _main_manus_old = require("./main_manus_old");
var _milage_master = require("./milage_master");
var _parent_manus = require("./parent_manus");
var _peakRate = require("./peakRate");
var _project_masters = require("./project_masters");
var _rate_per_km = require("./rate_per_km");
var _role_wise_permissions = require("./role_wise_permissions");
var _states = require("./states");
var _stationery = require("./stationery");
var _text = require("./text");

function initModels(sequelize) {
  var Accident = _Accident(sequelize, DataTypes);
  var AccidentVehiceImages = _AccidentVehiceImages(sequelize, DataTypes);
  var AccidentVehicle = _AccidentVehicle(sequelize, DataTypes);
  var Action = _Action(sequelize, DataTypes);
  var AttendanceMode = _AttendanceMode(sequelize, DataTypes);
  var Attnder = _Attnder(sequelize, DataTypes);
  var AuthorizedAttender = _AuthorizedAttender(sequelize, DataTypes);
  var BIllingDsrDetails = _BIllingDsrDetails(sequelize, DataTypes);
  var BankDetails = _BankDetails(sequelize, DataTypes);
  var BaseRate = _BaseRate(sequelize, DataTypes);
  var BillingCycle = _BillingCycle(sequelize, DataTypes);
  var BlueDartAdhocTrip = _BlueDartAdhocTrip(sequelize, DataTypes);
  var BuType = _BuType(sequelize, DataTypes);
  var CREDITIRNDetails = _CREDITIRNDetails(sequelize, DataTypes);
  var CRImage = _CRImage(sequelize, DataTypes);
  var CashRequest = _CashRequest(sequelize, DataTypes);
  var City_State = _City_State(sequelize, DataTypes);
  var ControlRoute = _ControlRoute(sequelize, DataTypes);
  var Country = _Country(sequelize, DataTypes);
  var CustAddress = _CustAddress(sequelize, DataTypes);
  var CustDiscount = _CustDiscount(sequelize, DataTypes);
  var CustInvMap = _CustInvMap(sequelize, DataTypes);
  var CustRateMap = _CustRateMap(sequelize, DataTypes);
  var CustRouteMap = _CustRouteMap(sequelize, DataTypes);
  var CustomerMaster = _CustomerMaster(sequelize, DataTypes);
  var CustomerSac = _CustomerSac(sequelize, DataTypes);
  var CustomerSeviceType = _CustomerSeviceType(sequelize, DataTypes);
  var CustomerType = _CustomerType(sequelize, DataTypes);
  var DSLRateRevise = _DSLRateRevise(sequelize, DataTypes);
  var DSalUpdates = _DSalUpdates(sequelize, DataTypes);
  var DailyRateRevise = _DailyRateRevise(sequelize, DataTypes);
  var Dealer = _Dealer(sequelize, DataTypes);
  var DebitCreditNote = _DebitCreditNote(sequelize, DataTypes);
  var DebitReason = _DebitReason(sequelize, DataTypes);
  var DebitType = _DebitType(sequelize, DataTypes);
  var DeletedTrips = _DeletedTrips(sequelize, DataTypes);
  var DepoMaster = _DepoMaster(sequelize, DataTypes);
  var DieselAdjustment = _DieselAdjustment(sequelize, DataTypes);
  var DieselDiscount = _DieselDiscount(sequelize, DataTypes);
  var DieselSlip = _DieselSlip(sequelize, DataTypes);
  var Docket = _Docket(sequelize, DataTypes);
  var DocketPackage = _DocketPackage(sequelize, DataTypes);
  var Driver = _Driver(sequelize, DataTypes);
  var DriverAccount = _DriverAccount(sequelize, DataTypes);
  var DriverAssigntToVehicle = _DriverAssigntToVehicle(sequelize, DataTypes);
  var DriverAttendance = _DriverAttendance(sequelize, DataTypes);
  var DriverAvailable = _DriverAvailable(sequelize, DataTypes);
  var DriverBacklog = _DriverBacklog(sequelize, DataTypes);
  var DriverBlock = _DriverBlock(sequelize, DataTypes);
  var DriverBlockDetails = _DriverBlockDetails(sequelize, DataTypes);
  var DriverCredits = _DriverCredits(sequelize, DataTypes);
  var DriverDebits = _DriverDebits(sequelize, DataTypes);
  var DriverDeleteAttendace = _DriverDeleteAttendace(sequelize, DataTypes);
  var DriverDoc = _DriverDoc(sequelize, DataTypes);
  var DriverImp = _DriverImp(sequelize, DataTypes);
  var DriverLadgerAmount = _DriverLadgerAmount(sequelize, DataTypes);
  var DriverSalDeduction = _DriverSalDeduction(sequelize, DataTypes);
  var DriverSalary = _DriverSalary(sequelize, DataTypes);
  var DsrBlock = _DsrBlock(sequelize, DataTypes);
  var DummyDriverStl = _DummyDriverStl(sequelize, DataTypes);
  var DummyTripSheet = _DummyTripSheet(sequelize, DataTypes);
  var EmpDet = _EmpDet(sequelize, DataTypes);
  var EmpSalary = _EmpSalary(sequelize, DataTypes);
  var Emp_Attend = _Emp_Attend(sequelize, DataTypes);
  var Emp_Bank = _Emp_Bank(sequelize, DataTypes);
  var Emp_Doc = _Emp_Doc(sequelize, DataTypes);
  var EmployeeMaster = _EmployeeMaster(sequelize, DataTypes);
  var ExpenseCategory = _ExpenseCategory(sequelize, DataTypes);
  var FSCalc = _FSCalc(sequelize, DataTypes);
  var FastTag = _FastTag(sequelize, DataTypes);
  var FinisherList = _FinisherList(sequelize, DataTypes);
  var Food_Details = _Food_Details(sequelize, DataTypes);
  var FscRoute = _FscRoute(sequelize, DataTypes);
  var FuleCharge = _FuleCharge(sequelize, DataTypes);
  var Gtax = _Gtax(sequelize, DataTypes);
  var HR_Dept = _HR_Dept(sequelize, DataTypes);
  var Hr_Jobs = _Hr_Jobs(sequelize, DataTypes);
  var Hr_Leave_Master = _Hr_Leave_Master(sequelize, DataTypes);
  var Hr_Leave_Mode = _Hr_Leave_Mode(sequelize, DataTypes);
  var Hr_Leave_Register = _Hr_Leave_Register(sequelize, DataTypes);
  var Hr_Leave_Transaction = _Hr_Leave_Transaction(sequelize, DataTypes);
  var Hr_Leave_type = _Hr_Leave_type(sequelize, DataTypes);
  var Hr_Locations = _Hr_Locations(sequelize, DataTypes);
  var IRNDetails = _IRNDetails(sequelize, DataTypes);
  var ImpAmountReq = _ImpAmountReq(sequelize, DataTypes);
  var ImpBank = _ImpBank(sequelize, DataTypes);
  var ImpTransaction = _ImpTransaction(sequelize, DataTypes);
  var ImpTransactionDetails = _ImpTransactionDetails(sequelize, DataTypes);
  var ImpTransactionDetailsExp = _ImpTransactionDetailsExp(sequelize, DataTypes);
  var InvType = _InvType(sequelize, DataTypes);
  var InvoiceDetail = _InvoiceDetail(sequelize, DataTypes);
  var InvoiceMaster = _InvoiceMaster(sequelize, DataTypes);
  var InvoiceTotalDetail = _InvoiceTotalDetail(sequelize, DataTypes);
  var IssueBoardStatus = _IssueBoardStatus(sequelize, DataTypes);
  var IssueCat = _IssueCat(sequelize, DataTypes);
  var IssueCurrentStatus = _IssueCurrentStatus(sequelize, DataTypes);
  var IssueSubCat = _IssueSubCat(sequelize, DataTypes);
  var IssueSubCatold = _IssueSubCatold(sequelize, DataTypes);
  var IssueTicket = _IssueTicket(sequelize, DataTypes);
  var IssueTicketSubCat = _IssueTicketSubCat(sequelize, DataTypes);
  var LegalVehicleImages = _LegalVehicleImages(sequelize, DataTypes);
  var MarketCust = _MarketCust(sequelize, DataTypes);
  var MarketRoute = _MarketRoute(sequelize, DataTypes);
  var MilkRTInVDet = _MilkRTInVDet(sequelize, DataTypes);
  var MisDiesel = _MisDiesel(sequelize, DataTypes);
  var MplFsc = _MplFsc(sequelize, DataTypes);
  var Notification = _Notification(sequelize, DataTypes);
  var OfficeMaster = _OfficeMaster(sequelize, DataTypes);
  var OldTripSettlement = _OldTripSettlement(sequelize, DataTypes);
  var OnRouteExp = _OnRouteExp(sequelize, DataTypes);
  var OnRouteTouchingPoint = _OnRouteTouchingPoint(sequelize, DataTypes);
  var OnRouteTripAmend = _OnRouteTripAmend(sequelize, DataTypes);
  var OtherDriverDebit = _OtherDriverDebit(sequelize, DataTypes);
  var PackingMethods = _PackingMethods(sequelize, DataTypes);
  var PaymentMode = _PaymentMode(sequelize, DataTypes);
  var PaymentReciept = _PaymentReciept(sequelize, DataTypes);
  var PaymentRecieptTrans = _PaymentRecieptTrans(sequelize, DataTypes);
  var PlanCat = _PlanCat(sequelize, DataTypes);
  var PlaneCategories = _PlaneCategories(sequelize, DataTypes);
  var PodDocument = _PodDocument(sequelize, DataTypes);
  var PodVerify = _PodVerify(sequelize, DataTypes);
  var PumpDetails = _PumpDetails(sequelize, DataTypes);
  var RTInVDet = _RTInVDet(sequelize, DataTypes);
  var RatePerKM = _RatePerKM(sequelize, DataTypes);
  var RateUpdtRecords = _RateUpdtRecords(sequelize, DataTypes);
  var Reconciliation_Remark = _Reconciliation_Remark(sequelize, DataTypes);
  var Rent_Details = _Rent_Details(sequelize, DataTypes);
  var RouteCategory = _RouteCategory(sequelize, DataTypes);
  var RouteDriverMap = _RouteDriverMap(sequelize, DataTypes);
  var RouteDummy = _RouteDummy(sequelize, DataTypes);
  var RouteMaster = _RouteMaster(sequelize, DataTypes);
  var RouteRate = _RouteRate(sequelize, DataTypes);
  var RouteRateValidation = _RouteRateValidation(sequelize, DataTypes);
  var RouteTripMap = _RouteTripMap(sequelize, DataTypes);
  var Salary = _Salary(sequelize, DataTypes);
  var SaleValue = _SaleValue(sequelize, DataTypes);
  var ScheduleWithTicket = _ScheduleWithTicket(sequelize, DataTypes);
  var ServiceTracking = _ServiceTracking(sequelize, DataTypes);
  var ServiceTrackingTrans = _ServiceTrackingTrans(sequelize, DataTypes);
  var SettleStatus = _SettleStatus(sequelize, DataTypes);
  var Shop_Master = _Shop_Master(sequelize, DataTypes);
  var StdDieselDipo = _StdDieselDipo(sequelize, DataTypes);
  var StdExpStamp = _StdExpStamp(sequelize, DataTypes);
  var StdExpenses = _StdExpenses(sequelize, DataTypes);
  var StdForControl = _StdForControl(sequelize, DataTypes);
  var StdTat = _StdTat(sequelize, DataTypes);
  var SubDipo = _SubDipo(sequelize, DataTypes);
  // var TABLE 124 = _TABLE 124(sequelize, DataTypes);
  // var TABLE 138 = _TABLE 138(sequelize, DataTypes);
  // var TABLE 146 = _TABLE 146(sequelize, DataTypes);
  // var TABLE 148 = _TABLE 148(sequelize, DataTypes);
  // var TABLE 186 = _TABLE 186(sequelize, DataTypes);
  var TallyLedger = _TallyLedger(sequelize, DataTypes);
  var TatDummy = _TatDummy(sequelize, DataTypes);
  var Taxes = _Taxes(sequelize, DataTypes);
  var TouchPoints = _TouchPoints(sequelize, DataTypes);
  var TouchPointsTiming = _TouchPointsTiming(sequelize, DataTypes);
  var TripAdvance = _TripAdvance(sequelize, DataTypes);
  var TripAmendReason = _TripAmendReason(sequelize, DataTypes);
  var TripCharges = _TripCharges(sequelize, DataTypes);
  var TripControl = _TripControl(sequelize, DataTypes);
  var TripInvStat = _TripInvStat(sequelize, DataTypes);
  var TripNature = _TripNature(sequelize, DataTypes);
  var TripOperation = _TripOperation(sequelize, DataTypes);
  var TripPlan = _TripPlan(sequelize, DataTypes);
  var TripPlanAmend = _TripPlanAmend(sequelize, DataTypes);
  var TripPlanAmend2 = _TripPlanAmend2(sequelize, DataTypes);
  var TripPlanSchedule = _TripPlanSchedule(sequelize, DataTypes);
  var TripSettlement = _TripSettlement(sequelize, DataTypes);
  var TripSettlement2 = _TripSettlement2(sequelize, DataTypes);
  var TripStatus = _TripStatus(sequelize, DataTypes);
  var TripType = _TripType(sequelize, DataTypes);
  var TuchingOrder = _TuchingOrder(sequelize, DataTypes);
  var UserType = _UserType(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var VMTicketTrack = _VMTicketTrack(sequelize, DataTypes);
  var VehDummy = _VehDummy(sequelize, DataTypes);
  var VehicelDepo = _VehicelDepo(sequelize, DataTypes);
  var Vehicle = _Vehicle(sequelize, DataTypes);
  var VehicleAssignToCust = _VehicleAssignToCust(sequelize, DataTypes);
  var VehicleAvailable = _VehicleAvailable(sequelize, DataTypes);
  var VehicleBacklog = _VehicleBacklog(sequelize, DataTypes);
  var VehicleCapacity = _VehicleCapacity(sequelize, DataTypes);
  var VehicleDebit = _VehicleDebit(sequelize, DataTypes);
  var VehicleImages = _VehicleImages(sequelize, DataTypes);
  var VehicleLength = _VehicleLength(sequelize, DataTypes);
  var VehicleStatus = _VehicleStatus(sequelize, DataTypes);
  var Vehiclesize = _Vehiclesize(sequelize, DataTypes);
  var VehilceCredit = _VehilceCredit(sequelize, DataTypes);
  var VendorDetails = _VendorDetails(sequelize, DataTypes);
  var VendorDiesel = _VendorDiesel(sequelize, DataTypes);
  var VendorDieselVucher = _VendorDieselVucher(sequelize, DataTypes);
  var VendorMaster = _VendorMaster(sequelize, DataTypes);
  var VendorType = _VendorType(sequelize, DataTypes);
  var VentureDoc = _VentureDoc(sequelize, DataTypes);
  var VoucherImages = _VoucherImages(sequelize, DataTypes);
  var WorkDoneBY = _WorkDoneBY(sequelize, DataTypes);
  var Work_details = _Work_details(sequelize, DataTypes);
  var advdummy = _advdummy(sequelize, DataTypes);
  var city = _city(sequelize, DataTypes);
  var leagel = _leagel(sequelize, DataTypes);
  var main_manus = _main_manus(sequelize, DataTypes);
  var main_manus_old = _main_manus_old(sequelize, DataTypes);
  var milage_master = _milage_master(sequelize, DataTypes);
  var parent_manus = _parent_manus(sequelize, DataTypes);
  var peakRate = _peakRate(sequelize, DataTypes);
  var project_masters = _project_masters(sequelize, DataTypes);
  var rate_per_km = _rate_per_km(sequelize, DataTypes);
  var role_wise_permissions = _role_wise_permissions(sequelize, DataTypes);
  var states = _states(sequelize, DataTypes);
  var stationery = _stationery(sequelize, DataTypes);
  var text = _text(sequelize, DataTypes);
  
  TripOperation.belongsTo(TripPlan, { as: "TripPlan", foreignKey: "TripId" });
  TripPlan.hasMany(TripOperation, { as: "TripOperations", foreignKey: "TripId" });

  CustRateMap.belongsTo(CustomerMaster, { as: "Cust", foreignKey: "CustId"});
  CustomerMaster.hasMany(CustRateMap, { as: "CustRateMaps", foreignKey: "CustId"});

  CustRateMap.belongsTo(CustomerSeviceType, { as: "RouteType_CustomerSeviceType", foreignKey: "RouteType"});
  CustomerSeviceType.hasMany(CustRateMap, { as: "CustRateMaps", foreignKey: "RouteType"});

  Docket.belongsTo(DocketPackage, { as: "Package", foreignKey: "PackageId"});
  DocketPackage.hasMany(Docket, { as: "Dockets", foreignKey: "PackageId"});

  CustRateMap.belongsTo(RouteMaster, { as: "Route", foreignKey: "RouteId"});
  RouteMaster.hasMany(CustRateMap, { as: "CustRateMaps", foreignKey: "RouteId"});

  CustRouteMap.belongsTo(RouteMaster, { as: "Route", foreignKey: "RouteId"});
  RouteMaster.hasMany(CustRouteMap, { as: "CustRouteMaps", foreignKey: "RouteId"});

  Docket.belongsTo(TripCharges, { as: "TripCharge", foreignKey: "TripChargeId"});
  TripCharges.hasMany(Docket, { as: "Dockets", foreignKey: "TripChargeId"});

  CustRateMap.belongsTo(TripType, { as: "trip_type", foreignKey: "TripType"});
  TripType.hasMany(CustRateMap, { as: "CustRateMaps", foreignKey: "TripType"});

  city.belongsTo(states, { as: "state", foreignKey: "stateId"});
  states.hasMany(city, { as: "cities", foreignKey: "stateId"});

  CustomerMaster.belongsTo(RouteMaster, { as: "RouteMasters", foreignKey: "CustId" });
  RouteMaster.hasMany(RouteMaster, { as: "Cust", foreignKey: "CustId" });

  TripPlan.belongsTo(CustomerMaster, { as: "CustomerMasters", foreignKey: "CustId" });
  CustomerMaster.hasOne(TripPlan, { as: "TripPlan", foreignKey: "CustId" });

  TripPlan.belongsTo(MarketCust, { as: "MarketCust", foreignKey: "CustId" });
  MarketCust.hasOne(TripPlan, { as: "TripPlan", foreignKey: "CustId" });

  TripPlan.belongsTo( Vehicle , {as: "Vehicle", foreignKey: "VehicleId"});
  Vehicle.hasOne(TripPlan , {as: "TripPlan", foreignKey: "VehicleId"});

  TripPlan.belongsTo(Driver, {as: "Driver", foreignKey: "Driver1Id"});
  Driver.hasOne(TripPlan , {as: "TripPlan", foreignKey: "Driver1Id"});

  TripPlan.belongsTo(CustRateMap, { as: "CustRateMaps", foreignKey: "CustId" });
  CustRateMap.hasOne(TripPlan, { as: "TripPlan", foreignKey: "CustId" });

  TripPlan.belongsTo(RouteMaster, {as : "route_master" , foreignKey: "RouteId"});
  RouteMaster.hasOne(TripPlan, {as: "TripPlan", foreignKey: "RouteId"});

  TripType.hasOne(TripPlan , { as: 'TripPlan', foreignKey: "TripType" });
  TripPlan.belongsTo(TripType, { as: "tripType", foreignKey: "TripType" }); 

  RouteMaster.belongsTo(city, {as: 'source_city',foreignKey: 'Source'});
  city.hasMany(RouteMaster, {as: 'source_routes', foreignKey: 'Source' });

  RouteMaster.belongsTo(city, {as: 'dest_city',foreignKey: 'Destination'});
  city.hasMany(RouteMaster, {as: 'destination_routes', foreignKey: 'Destination' });

  TripOperation.belongsTo(TripPlanSchedule, { as: "TripPlanSchedule", foreignKey: "TripId" });
  TripPlanSchedule.hasMany(TripOperation, { as: "TripOperations", foreignKey: "TripId" });

  TripPlanSchedule.belongsTo(CustomerMaster, { as: "CustomerMasters", foreignKey: "CustId" });
  CustomerMaster.hasOne(TripPlanSchedule, { as: "TripPlanSchedule", foreignKey: "CustId" });

  TripPlanSchedule.belongsTo(MarketCust, { as: "MarketCust", foreignKey: "CustId" });
  MarketCust.hasOne(TripPlanSchedule, { as: "TripPlanSchedule", foreignKey: "CustId" });

  TripPlanSchedule.belongsTo( Vehicle , {as: "Vehicle", foreignKey: "VehicleId"});
  Vehicle.hasOne(TripPlanSchedule , {as: "TripPlanSchedule", foreignKey: "VehicleId"});

  TripPlanSchedule.belongsTo(Driver, {as: "Driver", foreignKey: "Driver1Id"});
  Driver.hasOne(TripPlanSchedule , {as: "TripPlanSchedule", foreignKey: "Driver1Id"});

  TripPlanSchedule.belongsTo(CustRateMap, { as: "CustRateMaps", foreignKey: "CustId" });
  CustRateMap.hasOne(TripPlanSchedule, { as: "TripPlanSchedule", foreignKey: "CustId" });

  TripPlanSchedule.belongsTo(RouteMaster, {as : "Route_Master" , foreignKey: "RouteId"});
  RouteMaster.hasOne(TripPlanSchedule, {as: "TripPlanSchedule", foreignKey: "RouteId"});

  TripPlanSchedule.belongsTo(TripType ,{as: 'tripType', foreignKey: "TripType"});
  TripType.hasOne(TripPlanSchedule, {as: "TripPlanSchedule", foreignKey: "TripType"});

  TripAdvance.belongsTo(TripOperation,  { as: "TripOperation", foreignKey: "TripId"});
  TripOperation.hasOne(TripAdvance, { as: "TripAdvance", foreignKey: "TripId"});

  // RouteMaster.belongsTo(city, {as: 'source_city',foreignKey: 'Source'});
  // city.hasMany(RouteMaster, {as: 'source_routes', foreignKey: 'Source' });

  // RouteMaster.belongsTo(city, {as: 'dest_city',foreignKey: 'Destination'});
  // city.hasMany(RouteMaster, {as: 'destination_routes', foreignKey: 'Destination' });



  return {
    Accident,
    AccidentVehiceImages,
    AccidentVehicle,
    Action,
    AttendanceMode,
    Attnder,
    AuthorizedAttender,
    BIllingDsrDetails,
    BankDetails,
    BaseRate,
    BillingCycle,
    BlueDartAdhocTrip,
    BuType,
    CREDITIRNDetails,
    CRImage,
    CashRequest,
    City_State,
    ControlRoute,
    Country,
    CustAddress,
    CustDiscount,
    CustInvMap,
    CustRateMap,
    CustRouteMap,
    CustomerMaster,
    CustomerSac,
    CustomerSeviceType,
    CustomerType,
    DSLRateRevise,
    DSalUpdates,
    DailyRateRevise,
    Dealer,
    DebitCreditNote,
    DebitReason,
    DebitType,
    DeletedTrips,
    DepoMaster,
    DieselAdjustment,
    DieselDiscount,
    DieselSlip,
    Docket,
    DocketPackage,
    Driver,
    DriverAccount,
    DriverAssigntToVehicle,
    DriverAttendance,
    DriverAvailable,
    DriverBacklog,
    DriverBlock,
    DriverBlockDetails,
    DriverCredits,
    DriverDebits,
    DriverDeleteAttendace,
    DriverDoc,
    DriverImp,
    DriverLadgerAmount,
    DriverSalDeduction,
    DriverSalary,
    DsrBlock,
    DummyDriverStl,
    DummyTripSheet,
    EmpDet,
    EmpSalary,
    Emp_Attend,
    Emp_Bank,
    Emp_Doc,
    EmployeeMaster,
    ExpenseCategory,
    FSCalc,
    FastTag,
    FinisherList,
    Food_Details,
    FscRoute,
    FuleCharge,
    Gtax,
    HR_Dept,
    Hr_Jobs,
    Hr_Leave_Master,
    Hr_Leave_Mode,
    Hr_Leave_Register,
    Hr_Leave_Transaction,
    Hr_Leave_type,
    Hr_Locations,
    IRNDetails,
    ImpAmountReq,
    ImpBank,
    ImpTransaction,
    ImpTransactionDetails,
    ImpTransactionDetailsExp,
    InvType,
    InvoiceDetail,
    InvoiceMaster,
    InvoiceTotalDetail,
    IssueBoardStatus,
    IssueCat,
    IssueCurrentStatus,
    IssueSubCat,
    IssueSubCatold,
    IssueTicket,
    IssueTicketSubCat,
    LegalVehicleImages,
    MarketCust,
    MarketRoute,
    MilkRTInVDet,
    MisDiesel,
    MplFsc,
    Notification,
    OfficeMaster,
    OldTripSettlement,
    OnRouteExp,
    OnRouteTouchingPoint,
    OnRouteTripAmend,
    OtherDriverDebit,
    PackingMethods,
    PaymentMode,
    PaymentReciept,
    PaymentRecieptTrans,
    PlanCat,
    PlaneCategories,
    PodDocument,
    PodVerify,
    PumpDetails,
    RTInVDet,
    RatePerKM,
    RateUpdtRecords,
    Reconciliation_Remark,
    Rent_Details,
    RouteCategory,
    RouteDriverMap,
    RouteDummy,
    RouteMaster,
    RouteRate,
    RouteRateValidation,
    RouteTripMap,
    Salary,
    SaleValue,
    ScheduleWithTicket,
    ServiceTracking,
    ServiceTrackingTrans,
    SettleStatus,
    Shop_Master,
    StdDieselDipo,
    StdExpStamp,
    StdExpenses,
    StdForControl,
    StdTat,
    SubDipo,
    // TABLE 124,
    // TABLE 138,
    // TABLE 146,
    // TABLE 148,
    // TABLE 186,
    TallyLedger,
    TatDummy,
    Taxes,
    TouchPoints,
    TouchPointsTiming,
    TripAdvance,
    TripAmendReason,
    TripCharges,
    TripControl,
    TripInvStat,
    TripNature,
    TripOperation,
    TripPlan,
    TripPlanAmend,
    TripPlanAmend2,
    TripPlanSchedule,
    TripSettlement,
    TripSettlement2,
    TripStatus,
    TripType,
    TuchingOrder,
    UserType,
    Users,
    VMTicketTrack,
    VehDummy,
    VehicelDepo,
    Vehicle,
    VehicleAssignToCust,
    VehicleAvailable,
    VehicleBacklog,
    VehicleCapacity,
    VehicleDebit,
    VehicleImages,
    VehicleLength,
    VehicleStatus,
    Vehiclesize,
    VehilceCredit,
    VendorDetails,
    VendorDiesel,
    VendorDieselVucher,
    VendorMaster,
    VendorType,
    VentureDoc,
    VoucherImages,
    WorkDoneBY,
    Work_details,
    advdummy,
    city,
    leagel,
    main_manus,
    main_manus_old,
    milage_master,
    parent_manus,
    peakRate,
    project_masters,
    rate_per_km,
    role_wise_permissions,
    states,
    stationery,
    text,
  };
}

const DBMODELS = initModels(sequelize)
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
module.exports = { DBMODELS };
