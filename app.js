var _lang = 'en';
var _user = null;
var _allUsers = [];
var _lastSvcId = null;
var _lastSubSvcId = null;
var _prices = {};
var _apiBase = '';

// ---- CLEAR OLD DATA & LOAD SAVED ----
try {
  var ver = localStorage.getItem('profit_db_ver');
  if (ver !== '2') {
    localStorage.removeItem('profit_user');
    localStorage.removeItem('profit_users');
    localStorage.setItem('profit_db_ver', '2');
  }
  var u = localStorage.getItem('profit_user');
  if (u) _user = JSON.parse(u);
  var a = localStorage.getItem('profit_users');
  if (a) _allUsers = JSON.parse(a);
  var l = localStorage.getItem('profit_lang');
  if (l) _lang = l;
  var p = localStorage.getItem('profit_prices');
  if (p) _prices = JSON.parse(p);
} catch (e) {}

// ---- TRANSLATIONS ----
var _s = {
  en: {
    appName: 'ProFIX',
    langTitle: 'Choose your language',
    signupSubtitle: 'Fix it with ProFIX',
    createAccount: 'Create your account',
    fullName: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    whatsappNote: 'Must be a WhatsApp-enabled number',
    password: 'Password',
    address: 'Address',
    createAccountBtn: 'Create Account',
    haveAccount: 'Already have an account?',
    logIn: 'Log In',
    accountCreated: 'Account Created!',
    welcomeMsg: 'Welcome to ProFIX. You can now browse and request services.',
    browseServices: 'Browse Services',
    welcomeBack: 'Welcome back',
    loginTitle: 'Log in to your account',
    loginBtn: 'Log In',
    noAccount: "Don't have an account?",
    signUp: 'Sign Up',
    welcomeBackTitle: 'Welcome back!',
    redirectMsg: 'Taking you to your dashboard...',
    hello: 'Hello',
    logout: 'Logout',
    homeSub: 'What do you need fixed today?',
    searchPlaceholder: 'Search services...',
    allServices: 'All Services',
    errFullNameReq: 'Full name is required.',
    errFullNameLen: 'Name must be at least 2 characters.',
    errEmailReq: 'Email is required.',
    errEmailValid: 'Enter a valid email address.',
    errPhoneReq: 'WhatsApp number is required.',
    errPhoneValid: 'Enter a valid WhatsApp number.',
    errPassReq: 'Password is required.',
    errPassLen: 'Password must be at least 6 characters.',
    errAddrReq: 'Address is required.',
    errAddrLen: 'Please enter a full address.',
    errNoAccount: 'No account found. Please sign up first.',
    errEmailNotFound: 'Email not found.',
    errWrongPass: 'Wrong password.',
    detecting: 'Detecting your location...',
    detected: 'Location detected!',
    coordsFilled: 'Coordinates filled.',
    denied: 'Location permission denied.',
    unavailable: 'Location unavailable.',
    timeout: 'Location request timed out.',
    notSupported: 'Geolocation not supported.',
    searchNoResults: 'No services for',
    profileTitle: 'My Profile',
    saveBtn: 'Save Changes',
    savedMsg: 'Profile saved!',
    settingsTitle: 'Settings',
    languageLabel: 'Language',
    aboutLabel: 'About',
    aboutText: 'ProFIX v1.0 — Service Marketplace Simulator',
    reqDetails: 'Service Request Details',
    reqService: 'Service',
    reqDesc: 'Describe the issue',
    reqImage: 'Attach an image',
    chooseFile: 'Choose Image',
    reqPrice: 'Price',
    priceNote: 'This price covers labor only, not materials or parts.',
    sendRequest: 'Send Request',
    reqSent: 'Request Sent!',
    reqSentMsg: 'Your request has been submitted. A provider will contact you soon.',
    backHome: 'Back to Home',
    errDescReq: 'Please describe the issue',
    errImageReq: 'Please attach an image',
    noAcctDebug: 'No saved account. Sign up first.',
    acctFound: 'Account found:',
    sCarRepair: 'Car Repair',
    sMoving: 'Moving',
    sPlumbing: 'Plumbing',
    sElectrical: 'Electrical',
    sCleaning: 'Cleaning',
    sPainting: 'Painting',
    sITSup: 'IT Support',
    sTutoring: 'Tutoring',
    sAC: 'AC Repair',
    dAC: 'Installation & maintenance',
    ssAC1: 'Clean Split Unit',
    dsAC1: 'Indoor & outdoor unit cleaning',
    ssAC2: 'Gas Refill',
    dsAC2: 'Refrigerant gas replacement',
    ssAC3: 'Install Split Unit',
    dsAC3: 'New split AC installation',
    ssAC4: 'Move Split Unit',
    dsAC4: 'Relocate AC to another room',
    ssAC5: 'Dismantle Split Unit',
    dsAC5: 'Remove and take down AC',
    ssCarRepair1: 'Oil Change',
    dsCarRepair1: 'Engine oil replacement',
    ssCarRepair2: 'Brake Repair',
    dsCarRepair2: 'Brake pads & discs',
    ssCarRepair3: 'Engine Repair',
    dsCarRepair3: 'Engine diagnostics & repair',
    ssCarRepair4: 'Tire Change',
    dsCarRepair4: 'Replace or rotate tires',
    ssCarRepair5: 'Car Wash',
    dsCarRepair5: 'Exterior & interior wash',
    ssMoving1: 'Packing',
    dsMoving1: 'Pack items & boxes',
    ssMoving2: 'Loading',
    dsMoving2: 'Load furniture onto truck',
    ssMoving3: 'Transportation',
    dsMoving3: 'Move items to new location',
    ssMoving4: 'Unpacking',
    dsMoving4: 'Unpack & arrange items',
    ssMoving5: 'Furniture Assembly',
    dsMoving5: 'Assemble & set up furniture',
    ssPlumbing1: 'Pipe Repair',
    dsPlumbing1: 'Fix leaking or broken pipes',
    ssPlumbing2: 'Drain Cleaning',
    dsPlumbing2: 'Unclog drains & sewers',
    ssPlumbing3: 'Water Heater',
    dsPlumbing3: 'Install or repair water heater',
    ssPlumbing4: 'Faucet Repair',
    dsPlumbing4: 'Fix leaking faucets',
    ssPlumbing5: 'Toilet Repair',
    dsPlumbing5: 'Repair or replace toilet',
    ssElectrical1: 'Wiring',
    dsElectrical1: 'Electrical wiring & installation',
    ssElectrical2: 'Switch & Outlet',
    dsElectrical2: 'Fix switches & outlets',
    ssElectrical3: 'Light Installation',
    dsElectrical3: 'Install lights & fixtures',
    ssElectrical4: 'Panel Repair',
    dsElectrical4: 'Electrical panel repair',
    ssElectrical5: 'Ceiling Fan',
    dsElectrical5: 'Install or repair ceiling fan',
    ssCleaning1: 'Home Cleaning',
    dsCleaning1: 'Full home cleaning service',
    ssCleaning2: 'Office Cleaning',
    dsCleaning2: 'Office & workspace cleaning',
    ssCleaning3: 'Deep Cleaning',
    dsCleaning3: 'Thorough deep cleaning',
    ssCleaning4: 'Carpet Cleaning',
    dsCleaning4: 'Carpet shampoo & cleaning',
    ssCleaning5: 'Window Cleaning',
    dsCleaning5: 'Window & glass cleaning',
    ssPainting1: 'Interior Painting',
    dsPainting1: 'Paint interior walls & rooms',
    ssPainting2: 'Exterior Painting',
    dsPainting2: 'Paint exterior walls & facades',
    ssPainting3: 'Wallpaper',
    dsPainting3: 'Wallpaper installation & removal',
    ssPainting4: 'Paint Removal',
    dsPainting4: 'Strip old paint from surfaces',
    ssPainting5: 'Ceiling Painting',
    dsPainting5: 'Paint ceilings & high areas',
    ssITSup1: 'Computer Repair',
    dsITSup1: 'Fix hardware & software issues',
    ssITSup2: 'Network Setup',
    dsITSup2: 'WiFi & network configuration',
    ssITSup3: 'Virus Removal',
    dsITSup3: 'Remove viruses & malware',
    ssITSup4: 'Data Recovery',
    dsITSup4: 'Recover lost or deleted files',
    ssITSup5: 'Software Install',
    dsITSup5: 'Install & configure software',
    ssTutoring1: 'Math Tutoring',
    dsTutoring1: 'Algebra, geometry & calculus',
    ssTutoring2: 'Science Tutoring',
    dsTutoring2: 'Physics, chemistry & biology',
    ssTutoring3: 'Language Tutoring',
    dsTutoring3: 'Learn new languages',
    ssTutoring4: 'Test Preparation',
    dsTutoring4: 'Exam prep & study skills',
    ssTutoring5: 'Programming',
    dsTutoring5: 'Learn coding & programming',
    dCarRepair: 'Engine, brakes & more',
    dMoving: 'Furniture & boxes',
    dPlumbing: 'Pipes & fixtures',
    dElectrical: 'Wiring & repairs',
    dCleaning: 'Home & office',
    dPainting: 'Interior & exterior',
    dITSup: 'Computers & networks',
    dTutoring: 'Academic & skills',
  },
  ar: {
    appName: '\u0628\u0631\u0648\u0641\u064A\u0643\u0633',
    langTitle: '\u0627\u062E\u062A\u0631 \u0644\u063A\u062A\u0643',
    signupSubtitle: '\u0623\u0635\u0644\u062D\u0647\u0627 \u0645\u0639 \u0628\u0631\u0648\u0641\u064A\u0643\u0633',
    createAccount: '\u0623\u0646\u0634\u0626 \u062D\u0633\u0627\u0628\u0643',
    fullName: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644',
    email: '\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A',
    phone: '\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641',
    whatsappNote: '\u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0627\u0644\u0631\u0642\u0645 \u0645\u0641\u0639\u0644\u0627\u064B \u0639\u0644\u0649 \u0648\u0627\u062A\u0633\u0627\u0628',
    password: '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631',
    address: '\u0627\u0644\u0639\u0646\u0648\u0627\u0646',
    createAccountBtn: '\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628',
    haveAccount: '\u0644\u062F\u064A\u0643 \u062D\u0633\u0627\u0628 \u0628\u0627\u0644\u0641\u0639\u0644\u061F',
    logIn: '\u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644',
    accountCreated: '\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u0633\u0627\u0628!',
    welcomeMsg: '\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0643 \u0641\u064A \u0628\u0631\u0648\u0641\u064A\u0643\u0633. \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0622\u0646 \u062A\u0635\u0641\u062D \u0648\u0637\u0644\u0628 \u0627\u0644\u062E\u062F\u0645\u0627\u062A.',
    browseServices: '\u062A\u0635\u0641\u062D \u0627\u0644\u062E\u062F\u0645\u0627\u062A',
    welcomeBack: '\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0639\u0648\u062F\u062A\u0643',
    loginTitle: '\u0633\u062C\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0625\u0644\u0649 \u062D\u0633\u0627\u0628\u0643',
    loginBtn: '\u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644',
    noAccount: '\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u062D\u0633\u0627\u0628\u061F',
    signUp: '\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628',
    welcomeBackTitle: '\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0639\u0648\u062F\u062A\u0643!',
    redirectMsg: '\u062C\u0627\u0631\u064D \u062A\u062D\u0648\u064A\u0644\u0643 \u0625\u0644\u0649 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645...',
    hello: '\u0645\u0631\u062D\u0628\u0627\u064B',
    logout: '\u062A\u0633\u062C\u064A\u0644 \u062E\u0631\u0648\u062C',
    homeSub: '\u0645\u0627 \u0627\u0644\u0630\u064A \u062A\u0631\u064A\u062F \u0625\u0635\u0644\u0627\u062D\u0647 \u0627\u0644\u064A\u0648\u0645\u061F',
    searchPlaceholder: '\u0627\u0628\u062D\u062B \u0639\u0646 \u062E\u062F\u0645\u0627\u062A...',
    allServices: '\u062C\u0645\u064A\u0639 \u0627\u0644\u062E\u062F\u0645\u0627\u062A',
    errFullNameReq: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 \u0645\u0637\u0644\u0648\u0628.',
    errFullNameLen: '\u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0627\u0644\u0627\u0633\u0645 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u062D\u0631\u0641\u064A\u0646.',
    errEmailReq: '\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0645\u0637\u0644\u0648\u0628.',
    errEmailValid: '\u0623\u062F\u062E\u0644 \u0628\u0631\u064A\u062F\u0627\u064B \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u064B \u0635\u062D\u064A\u062D\u0627\u064B.',
    errPhoneReq: '\u0631\u0642\u0645 \u0648\u0627\u062A\u0633\u0627\u0628 \u0645\u0637\u0644\u0648\u0628.',
    errPhoneValid: '\u0623\u062F\u062E\u0644 \u0631\u0642\u0645 \u0648\u0627\u062A\u0633\u0627\u0628 \u0635\u062D\u064A\u062D.',
    errPassReq: '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0645\u0637\u0644\u0648\u0628\u0629.',
    errPassLen: '\u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 6 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644.',
    errAddrReq: '\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0645\u0637\u0644\u0648\u0628.',
    errAddrLen: '\u0627\u0644\u0631\u062C\u0627\u0621 \u0625\u062F\u062E\u0627\u0644 \u0639\u0646\u0648\u0627\u0646 \u0643\u0627\u0645\u0644.',
    errNoAccount: '\u0644\u0627 \u064A\u06488\u062F \u062D\u0633\u0627\u0628. \u0627\u0644\u0631\u062C\u0627\u0621 \u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628 \u0623\u0648\u0644\u0627\u064B.',
    errEmailNotFound: '\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F.',
    errWrongPass: '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u062E\u0627\u0637\u0626\u0629.',
    detecting: '\u062C\u0627\u0631\u064D \u062A\u062D\u062F\u064A\u062F \u0645\u0648\u0642\u0639\u0643...',
    detected: '\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0648\u0642\u0639!',
    coordsFilled: '\u062A\u0645 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A.',
    denied: '\u062A\u0645 \u0631\u0641\u0636 \u0625\u0630\u0646 \u0627\u0644\u0645\u0648\u0642\u0639.',
    unavailable: '\u0627\u0644\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D.',
    timeout: '\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u0637\u0644\u0628 \u0627\u0644\u0645\u0648\u0642\u0639.',
    notSupported: '\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645.',
    searchNoResults: '\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0644\u0640',
    profileTitle: '\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A',
    saveBtn: '\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A',
    savedMsg: '\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0641!',
    settingsTitle: '\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A',
    languageLabel: '\u0627\u0644\u0644\u063A\u0629',
    aboutLabel: '\u062D\u0648\u0644',
    aboutText: '\u0628\u0631\u0648\u0641\u064A\u0643\u0633 \u0625\u0635\u062F\u0627\u0631 1.0',
    reqDetails: 'تفاصيل طلب الخدمة',
    reqService: 'الخدمة',
    reqDesc: 'صف المشكلة',
    reqImage: 'أرفق صورة',
    chooseFile: 'اختر صورة',
    reqPrice: 'السعر',
    priceNote: 'هذا السعر يشمل أجرة اليد فقط، ولا يشمل شراء المواد أو القطع.',
    sendRequest: 'إرسال الطلب',
    reqSent: 'تم إرسال الطلب!',
    reqSentMsg: 'تم تقديم طلبك. سيتواصل معك مزود الخدمة قريباً.',
    backHome: 'العودة إلى الرئيسية',
    errDescReq: 'الرجاء وصف المشكلة',
    errImageReq: 'الرجاء إرفاق صورة',
    noAcctDebug: '\u0644\u0627 \u064A\u06488\u062F \u062D\u0633\u0627\u0628 \u0645\u062D\u0641\u0648\u0638. \u0623\u0646\u0634\u0626 \u062D\u0633\u0627\u0628\u0627\u064B \u0623\u0648\u0644\u0627\u064B.',
    acctFound: '\u0627\u0644\u062D\u0633\u0627\u0628 \u0645\u0648\u062C\u0648\u062F:',
    sCarRepair: '\u062A\u0635\u0644\u064A\u062D \u0633\u064A\u0627\u0631\u0627\u062A',
    sMoving: '\u0646\u0642\u0644 \u0623\u062B\u0627\u062B',
    sPlumbing: '\u0633\u0628\u0627\u0643\u0629',
    sElectrical: '\u0643\u0647\u0631\u0628\u0627\u0621',
    sCleaning: '\u062A\u0646\u0638\u064A\u0641',
    sPainting: '\u062F\u0647\u0627\u0646',
    sITSup: '\u062F\u0639\u0645 \u062A\u0642\u0646\u064A',
    sTutoring: '\u062A\u062F\u0631\u064A\u0633 \u062E\u0635\u0648\u0635\u064A',
    sAC: '\u062A\u0643\u064A\u064A\u0641',
    dAC: '\u062A\u0631\u0643\u064A\u0628 \u0648\u0635\u064A\u0627\u0646\u0629',
    ssAC1: '\u062A\u0646\u0638\u064A\u0641 \u0633\u0628\u0644\u062A',
    dsAC1: '\u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u0648\u062D\u062F\u0629 \u0627\u0644\u062F\u0627\u062E\u0644\u064A\u0629 \u0648\u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629',
    ssAC2: '\u062A\u0628\u062F\u064A\u0644 \u063A\u0627\u0632',
    dsAC2: '\u062A\u0639\u0628\u0626\u0629 \u063A\u0627\u0632 \u0627\u0644\u062A\u0628\u0631\u064A\u062F',
    ssAC3: '\u0646\u0635\u0628 \u0633\u0628\u0644\u062A',
    dsAC3: '\u062A\u0631\u0643\u064A\u0628 \u0645\u0643\u064A\u0641 \u062C\u062F\u064A\u062F',
    ssAC4: '\u0646\u0642\u0644 \u0633\u0628\u0644\u062A',
    dsAC4: '\u0646\u0642\u0644 \u0627\u0644\u0645\u0643\u064A\u0641 \u0625\u0644\u0649 \u063A\u0631\u0641\u0629 \u0623\u062E\u0631\u0649',
    ssAC5: '\u0641\u062A\u062D \u0633\u0628\u0644\u062A \u0648\u0627\u0646\u0632\u0627\u0644\u0647',
    dsAC5: '\u0641\u0643 \u0648\u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0645\u0643\u064A\u0641',
    ssCarRepair1: 'تغيير زيت',
    dsCarRepair1: 'تغيير زيت المحرك',
    ssCarRepair2: 'تصليح فرامل',
    dsCarRepair2: 'تصليح أقراص وقماش الفرامل',
    ssCarRepair3: 'تصليح محرك',
    dsCarRepair3: 'تشخيص وتصليح المحرك',
    ssCarRepair4: 'تبديل كفرات',
    dsCarRepair4: 'تبديل أو تدوير الكفرات',
    ssCarRepair5: 'غسيل سيارات',
    dsCarRepair5: 'غسيل داخلي وخارجي',
    ssMoving1: 'تغليف',
    dsMoving1: 'تغليف الأغراض والصناديق',
    ssMoving2: 'تحميل',
    dsMoving2: 'تحميل الأثاث على الشاحنة',
    ssMoving3: 'نقل',
    dsMoving3: 'نقل الأغراض إلى الموقع الجديد',
    ssMoving4: 'تفريغ',
    dsMoving4: 'تفريغ وترتيب الأغراض',
    ssMoving5: 'تركيب أثاث',
    dsMoving5: 'تركيب وتجميع الأثاث',
    ssPlumbing1: 'تصليح مواسير',
    dsPlumbing1: 'إصلاح تسريبات المواسير',
    ssPlumbing2: 'تنظيف مجاري',
    dsPlumbing2: 'فتح انسدادات المجاري',
    ssPlumbing3: 'سخان ماء',
    dsPlumbing3: 'تركيب أو تصليح سخان الماء',
    ssPlumbing4: 'تصليح حنفية',
    dsPlumbing4: 'إصلاح الحنفيات',
    ssPlumbing5: 'تصليح مرحاض',
    dsPlumbing5: 'تصليح أو استبدال المرحاض',
    ssElectrical1: 'تمديدات كهرباء',
    dsElectrical1: 'تمديدات كهربائية',
    ssElectrical2: 'فيش ومفاتيح',
    dsElectrical2: 'تصليح الفيش والمفاتيح',
    ssElectrical3: 'تركيب لمبات',
    dsElectrical3: 'تركيب اللمبات والإنارة',
    ssElectrical4: 'تصليح لوحة كهرباء',
    dsElectrical4: 'تصليح اللوحة الكهربائية',
    ssElectrical5: 'مروحة سقف',
    dsElectrical5: 'تركيب أو تصليح مروحة سقف',
    ssCleaning1: 'تنظيف منزل',
    dsCleaning1: 'تنظيف كامل للمنزل',
    ssCleaning2: 'تنظيف مكتب',
    dsCleaning2: 'تنظيف المكتب ومكان العمل',
    ssCleaning3: 'تنظيف عميق',
    dsCleaning3: 'تنظيف عميق شامل',
    ssCleaning4: 'تنظيف سجاد',
    dsCleaning4: 'غسيل وتنظيف السجاد',
    ssCleaning5: 'تنظيف شبابيك',
    dsCleaning5: 'تنظيف الشبابيك والزجاج',
    ssPainting1: 'دهان داخلي',
    dsPainting1: 'دهان الجدران والغرف الداخلية',
    ssPainting2: 'دهان خارجي',
    dsPainting2: 'دهان الجدران والواجهات الخارجية',
    ssPainting3: 'ورق جدران',
    dsPainting3: 'تركيب وإزالة ورق الجدران',
    ssPainting4: 'إزالة دهان',
    dsPainting4: 'إزالة الدهان القديم',
    ssPainting5: 'دهان سقف',
    dsPainting5: 'دهان الأسقف والأماكن العالية',
    ssITSup1: 'تصليح كمبيوتر',
    dsITSup1: 'إصلاح مشاكل الهاردوير والسوفت وير',
    ssITSup2: 'تركيب شبكة',
    dsITSup2: 'إعداد الشبكة والواي فاي',
    ssITSup3: 'إزالة فيروسات',
    dsITSup3: 'إزالة الفيروسات والبرامج الضارة',
    ssITSup4: 'استعادة بيانات',
    dsITSup4: 'استعادة الملفات المفقودة',
    ssITSup5: 'تثبيت برامج',
    dsITSup5: 'تثبيت وتكوين البرامج',
    ssTutoring1: 'تدريس رياضيات',
    dsTutoring1: 'جبر وهندسة وحساب',
    ssTutoring2: 'تدريس علوم',
    dsTutoring2: 'فيزياء وكيمياء وأحياء',
    ssTutoring3: 'تدريس لغة',
    dsTutoring3: 'تعليم لغات جديدة',
    ssTutoring4: 'تحضير اختبارات',
    dsTutoring4: 'تحضير للاختبارات والمهارات الدراسية',
    ssTutoring5: 'تدريس برمجة',
    dsTutoring5: 'تعليم البرمجة',
    dCarRepair: '\u0645\u062D\u0631\u0643\u060C \u0641\u0631\u0627\u0645\u0644 \u0648\u0627\u0644\u0645\u0632\u064A\u062F',
    dMoving: '\u0623\u062B\u0627\u062B \u0648\u0635\u0646\u0627\u062F\u064A\u0642',
    dPlumbing: '\u0645\u0648\u0627\u0633\u064A\u0631 \u0648\u062A\u0631\u0643\u064A\u0628\u0627\u062A',
    dElectrical: '\u062A\u0645\u062F\u064A\u062F\u0627\u062A \u0648\u0625\u0635\u0644\u0627\u062D\u0627\u062A',
    dCleaning: '\u0645\u0646\u0632\u0644 \u0648\u0645\u0643\u062A\u0628',
    dPainting: '\u062F\u0627\u062E\u0644\u064A \u0648\u062E\u0627\u0631\u062C\u064A',
    dITSup: '\u0643\u0645\u0628\u064A\u0648\u062A\u0631 \u0648\u0634\u0628\u0643\u0627\u062A',
    dTutoring: '\u0623\u0643\u0627\u062F\u064A\u0645\u064A \u0648\u0645\u0647\u0627\u0631\u0627\u062A',
  },
  ku: {
    appName: '\u067E\u0631\u06C6\u0641\u06CC\u06A9\u0633',
    langTitle: '\u0632\u0645\u0627\u0646\u06D5\u06A9\u06D5\u062A \u0647\u06D5\u06B5\u0628\u0698\u06CE\u0631\u06D5',
    signupSubtitle: '\u0686\u0627\u06A9\u06CC \u0628\u06A9\u06D5\u0648\u06D5 \u0628\u06D5 \u067E\u0631\u06C6\u0641\u06CC\u06A9\u0633',
    createAccount: '\u0647\u06D5\u0698\u0645\u0627\u0631\u06D5\u06A9\u06D5\u062A \u062F\u0631\u0648\u0633\u062A \u0628\u06A9\u06D5',
    fullName: '\u0646\u0627\u0648\u06CC \u062A\u06D5\u0648\u0627\u0648',
    email: '\u0626\u06CC\u0645\u06CE\u06CC\u06B5',
    phone: '\u0698\u0645\u0627\u0631\u06D5\u06CC \u0645\u06C6\u0628\u0627\u06CC\u0644',
    whatsappNote: '\u062F\u06D5\u0628\u06CE\u062A \u0698\u0645\u0627\u0631\u06D5\u06A9\u06D5 \u0644\u06D5 \u0648\u0627\u062A\u0633\u0627\u0628 \u0686\u0627\u0644\u0627\u06A9 \u0628\u06CE\u062A',
    password: '\u0648\u0634\u06D5\u06CC \u0646\u0647\u06CE\u0646\u06CC',
    address: '\u0646\u0627\u0648\u0646\u06CC\u0634\u0627\u0646',
    createAccountBtn: '\u062F\u0631\u0648\u0633\u062A\u06A9\u0631\u062F\u0646\u06CC \u0647\u06D5\u0698\u0645\u0627\u0631',
    haveAccount: '\u0647\u06D5\u0698\u0645\u0627\u0631\u062A \u0647\u06D5\u06CC\u06D5\u061F',
    logIn: '\u0686\u0648\u0648\u0646\u06D5\u0698\u0648\u0648\u0631\u06D5\u0648\u06D5',
    accountCreated: '\u0647\u06D5\u0698\u0645\u0627\u0631\u06D5\u06A9\u06D5\u062A \u062F\u0631\u0648\u0633\u062A\u06A9\u0631\u0627!',
    welcomeMsg: '\u0628\u06D5\u062E\u06CE\u0631\u0628\u06CE\u062A \u0628\u06C6 \u067E\u0631\u06C6\u0641\u06CC\u06A9\u0633.',
    browseServices: '\u0628\u06CC\u0646\u06CC\u0646\u06CC \u062E\u0632\u0645\u06D5\u062A\u06AF\u0648\u0632\u0627\u0631\u06CC\u06D5\u06A9\u0627\u0646',
    welcomeBack: '\u0628\u06D5\u062E\u06CE\u0631\u0628\u06CE\u062A\u06D5\u0648\u06D5',
    loginTitle: '\u0628\u0686\u06C6 \u0698\u0648\u0648\u0631\u06D5\u0648\u06D5 \u0628\u06C6 \u0647\u06D5\u0698\u0645\u0627\u0631\u06D5\u06A9\u06D5\u062A',
    loginBtn: '\u0686\u0648\u0648\u0646\u06D5\u0698\u0648\u0648\u0631\u06D5\u0648\u06D5',
    noAccount: '\u0647\u06D5\u0698\u0645\u0627\u0631\u062A \u0646\u06CC\u06D5\u061F',
    signUp: '\u062F\u0631\u0648\u0633\u062A\u06A9\u0631\u062F\u0646\u06CC \u0647\u06D5\u0698\u0645\u0627\u0631',
    welcomeBackTitle: '\u0628\u06D5\u062E\u06CE\u0631\u0628\u06CE\u062A\u06D5\u0648\u06D5!',
    redirectMsg: '\u0695\u06D5\u0648\u0627\u0646\u06D5\u06A9\u0631\u0627\u06CC\u062A \u0628\u06C6 \u062F\u0627\u0634\u0628\u06C6\u0631\u062F...',
    hello: '\u0633\u06B5\u0627\u0648',
    logout: '\u0686\u0648\u0648\u0646\u06D5\u062F\u06D5\u0631\u06D5\u0648\u06D5',
    homeSub: '\u0626\u06D5\u0645\u0695\u06C6 \u0686\u06CC\u062A \u062F\u06D5\u0648\u06CE\u062A \u0686\u0627\u06A9 \u0628\u06A9\u0631\u06CE\u062A\u061F',
    searchPlaceholder: '\u0628\u06AF\u06D5\u0695\u06CE \u0628\u06D5\u062F\u0648\u0627\u06CC \u062E\u0632\u0645\u06D5\u062A\u06AF\u0648\u0632\u0627\u0631\u06CC\u06D5\u06A9\u0627\u0646...',
    allServices: '\u0647\u06D5\u0645\u0648\u0648 \u062E\u0632\u0645\u06D5\u062A\u06AF\u0648\u0632\u0627\u0631\u06CC\u06D5\u06A9\u0627\u0646',
    errFullNameReq: '\u0646\u0627\u0648\u06CC \u062A\u06D5\u0648\u0627\u0648 \u067E\u06CE\u0648\u06CC\u0633\u062A\u06D5.',
    errFullNameLen: '\u0646\u0627\u0648 \u062F\u06D5\u0628\u06CE\u062A \u06A9\u06D5\u0645\u062A\u0631\u06CC\u0646 \u06F2 \u067E\u06CC\u062A \u0628\u06CE\u062A.',
    errEmailReq: '\u0626\u06CC\u0645\u06CE\u06CC\u06B5 \u067E\u06CE\u0648\u06CC\u0633\u062A\u06D5.',
    errEmailValid: '\u0626\u06CC\u0645\u06CE\u06CC\u06B5\u06CC\u06A9\u06CC \u0695\u0627\u0633\u062A \u0628\u0646\u0648\u0648\u0633\u06D5.',
    errPhoneReq: '\u0698\u0645\u0627\u0631\u06D5\u06CC \u0648\u0627\u062A\u0633\u0627\u0628 \u067E\u06CE\u0648\u06CC\u0633\u062A\u06D5.',
    errPhoneValid: '\u0698\u0645\u0627\u0631\u06D5\u06CC \u0648\u0627\u062A\u0633\u0627\u0628\u06CC \u0695\u0627\u0633\u062A \u0628\u0646\u0648\u0648\u0633\u06D5.',
    errPassReq: '\u0648\u0634\u06D5\u06CC \u0646\u0647\u06CE\u0646\u06CC \u067E\u06CE\u0648\u06CC\u0633\u062A\u06D5.',
    errPassLen: '\u0648\u0634\u06D5\u06CC \u0646\u0647\u06CE\u0646\u06CC \u062F\u06D5\u0628\u06CE\u062A \u06A9\u06D5\u0645\u062A\u0631\u06CC\u0646 \u06F6 \u067E\u06CC\u062A \u0628\u06CE\u062A.',
    errAddrReq: '\u0646\u0627\u0648\u0646\u06CC\u0634\u0627\u0646 \u067E\u06CE\u0648\u06CC\u0633\u062A\u06D5.',
    errAddrLen: '\u062A\u06A9\u0627\u06CC\u06D5 \u0646\u0627\u0648\u0646\u06CC\u0634\u0627\u0646\u06CE\u06A9\u06CC \u062A\u06D5\u0648\u0627\u0648 \u0628\u0646\u0648\u0648\u0633\u06D5.',
    errNoAccount: '\u0647\u06CC\u0686 \u0647\u06D5\u0698\u0645\u0627\u0631\u06CE\u06A9 \u0646\u06D5\u062F\u06C6\u0632\u0631\u0627\u06CC\u06D5\u0648\u06D5.',
    errEmailNotFound: '\u0626\u06CC\u0645\u06CE\u06CC\u06B5 \u0646\u06D5\u062F\u06C6\u0632\u0631\u0627\u06CC\u06D5\u0648\u06D5.',
    errWrongPass: '\u0648\u0634\u06D5\u06CC \u0646\u0647\u06CE\u0646\u06CC \u0647\u06D5\u0644\u06D5\u06D5.',
    detecting: '\u0628\u06D5\u062F\u0648\u0627\u06CC \u0634\u0648\u06CE\u0646\u06CC \u062A\u06C6\u062F\u0627 \u062F\u06D5\u06AF\u06D5\u0695\u06CE\u0645...',
    detected: '\u0634\u0648\u06CE\u0646 \u062F\u06C6\u0632\u0631\u0627\u06CC\u06D5\u0648\u06D5!',
    coordsFilled: '\u067E\u06C6\u062A\u0627\u0646\u06D5\u06A9\u0627\u0646 \u067E\u0695\u06A9\u0631\u0627\u0646.',
    denied: '\u0645\u06C6\u06B5\u06D5\u062A\u06CC \u0634\u0648\u06CE\u0646 \u0695\u06D5\u062A\u06A9\u0631\u0627\u06CC\u06D5\u0648\u06D5.',
    unavailable: '\u0634\u0648\u06CE\u0646 \u0628\u06D5\u0631\u062F\u06D5\u0633\u062A \u0646\u06CC\u06D5.',
    timeout: '\u06A9\u0627\u062A\u06CC \u062F\u0627\u0648\u0627\u06CC \u0634\u0648\u06CE\u0646 \u062A\u06D5\u0648\u0627\u0648 \u0628\u0648\u0648.',
    notSupported: '\u062F\u06CC\u0627\u0631\u06CC\u06A9\u0631\u062F\u0646\u06CC \u0634\u0648\u06CE\u0646 \u067E\u0634\u062A\u06CC\u0648\u0627\u0646\u06CC \u0646\u0627\u06A9\u0631\u06CE\u062A.',
    searchNoResults: '\u0647\u06CC\u0686 \u062E\u0632\u0645\u06D5\u062A\u06AF\u0648\u0632\u0627\u0631\u06CC\u06D5\u06A9 \u0646\u06D5\u062F\u06C6\u0632\u0631\u0627\u06CC\u06D5\u0648\u06D5 \u0628\u06C6',
    profileTitle: '\u067E\u0695\u0648\u0641\u0627\u06CC\u0644',
    saveBtn: '\u067E\u0627\u0634\u06D5\u06A9\u06D5\u0648\u062A\u06A9\u0631\u062F\u0646\u06CC \u06AF\u06C6\u0695\u0627\u0646\u06A9\u0627\u0631\u06CC\u06D5\u06A9\u0627\u0646',
    savedMsg: '\u067E\u0695\u0648\u0641\u0627\u06CC\u0644 \u067E\u0627\u0634\u06D5\u06A9\u06D5\u0648\u062A \u06A9\u0631\u0627!',
    settingsTitle: '\u0695\u06CE\u06A9\u062E\u0633\u062A\u0646\u06D5\u06A9\u0627\u0646',
    languageLabel: '\u0632\u0645\u0627\u0646',
    aboutLabel: '\u062F\u06D5\u0631\u0628\u0627\u0631\u06D5',
    aboutText: '\u067E\u0631\u06C6\u0641\u06CC\u06A9\u0633 \u0648\u06D5\u0631\u0632\u06CC\u0648\u0646\u06CC 1.0',
    reqDetails: 'ورداشتنامه‌ی داواکاری خزمەتگوزاری',
    reqService: 'خزمەتگوزاری',
    reqDesc: 'کێشه‌که‌ بنووسه',
    reqImage: 'وێنه‌یه‌ک هه‌ڵبژێره',
    chooseFile: 'وێنه‌ هه‌ڵبژێره',
    reqPrice: 'نرخ',
    priceNote: 'ئه‌م نرخه‌ ته‌نها بۆ کرێی ده‌سته‌، نه‌که‌ بۆ کڕینی که‌لوپه‌ل یان پارچه‌.',
    sendRequest: 'داواکاری بنێره',
    reqSent: 'داواکاری نێردرا!',
    reqSentMsg: 'داواکاریه‌که‌ت نێردرا. دابینکه‌رێک به‌م زووانه پێوه‌ندی ده‌کات.',
    backHome: 'گه‌ڕانه‌وه بۆ سه‌ره‌کی',
    errDescReq: 'تکایه کێشه‌که‌ بنووسه',
    errImageReq: 'تکایه وێنه‌یه‌ک هه‌ڵبژێره',
    noAcctDebug: '\u0647\u06CC\u0686 \u0647\u06D5\u0698\u0645\u0627\u0631\u06CE\u06A9 \u067E\u0627\u0634\u06D5\u06A9\u06D5\u0648\u062A \u0646\u06D5\u06A9\u0631\u0627\u0648\u06D5.',
    acctFound: '\u0647\u06D5\u0698\u0645\u0627\u0631 \u062F\u06C6\u0632\u0631\u0627\u06CC\u06D5\u0648\u06D5:',
    sCarRepair: '\u0686\u0627\u06A9\u06A9\u0631\u062F\u0646\u06CC \u0626\u06C6\u062A\u06C6\u0645\u06C6\u0628\u06CC\u0644',
    sMoving: '\u06AF\u0648\u0627\u0633\u062A\u0646\u06D5\u0648\u06D5\u06CC \u06A9\u06D5\u0644\u0648\u067E\u06D5\u0644',
    sPlumbing: '\u0644\u0648\u0648\u0644\u06D5\u06A9\u0627\u0646\u06CC \u0626\u0627\u0648',
    sElectrical: '\u06A9\u0627\u0631\u06D5\u0628\u0627',
    sCleaning: '\u067E\u0627\u06A9\u06A9\u0631\u062F\u0646\u06D5\u0648\u06D5',
    sPainting: '\u0695\u06D5\u0646\u06AF\u06A9\u0631\u062F\u0646',
    sITSup: '\u067E\u0634\u062A\u06CC\u0648\u0627\u0646\u06CC \u062A\u06D5\u06A9\u0646\u06CC\u06A9\u06CC',
    sTutoring: '\u0648\u0627\u0646\u062F\u0646\u06CC \u062A\u0627\u06CC\u0628\u06D5\u062A',
    sAC: '\u0686\u0627\u06A9\u06A9\u0631\u062F\u0646\u06CC \u0626\u06D5\u06CC \u0633\u06CC',
    dAC: '\u062F\u0627\u0645\u06D5\u0632\u0631\u0627\u0646\u062F\u0646 \u0648 \u0686\u0627\u06A9\u0631\u062F\u0646',
    ssAC1: '\u067E\u0627\u06A9\u06A9\u0631\u062F\u0646\u06CC \u0633\u067E\u0644\u06CC\u062A',
    dsAC1: '\u067E\u0627\u06A9\u06A9\u0631\u062F\u0646\u06CC \u06CC\u06D5\u06A9\u06D5\u06CC \u0646\u0627\u0648\u06D5\u0648\u06D5 \u0648 \u062F\u06D5\u0631\u06D5\u0648\u06D5',
    ssAC2: '\u06AF\u06C6\u0631\u06CC\u0646\u06CC \u06AF\u0627\u0632',
    dsAC2: '\u067E\u0695 \u06A9\u0631\u062F\u0646\u06CC \u06AF\u0627\u0632\u06CC \u0633\u0627\u0631\u062F\u06A9\u06D5\u0631\u062F\u0646\u06D5\u0648\u06D5',
    ssAC3: '\u062F\u0627\u0645\u06D5\u0632\u0631\u0627\u0646\u062F\u0646\u06CC \u0633\u067E\u0644\u06CC\u062A',
    dsAC3: '\u062F\u0627\u0645\u06D5\u0632\u0631\u0627\u0646\u062F\u0646\u06CC \u0626\u06D5\u06CC \u0633\u06CC\u06CC \u0646\u0648\u06CC',
    ssAC4: '\u06AF\u0648\u0627\u0633\u062A\u0646\u06D5\u0648\u06D5\u06CC \u0633\u067E\u0644\u06CC\u062A',
    dsAC4: '\u06AF\u0648\u0627\u0633\u062A\u0646\u06D5\u0648\u06D5\u06CC \u0626\u06D5\u06CC \u0633\u06CC \u0628\u06C6 \u0695\u0648\u0645\u06CC \u062A\u0631',
    ssAC5: '\u06A9\u0627\u0646\u062F\u0646\u06CC \u0633\u067E\u0644\u06CC\u062A \u0648 \u062F\u0627\u06AF\u0631\u062A\u0646\u06CC',
    dsAC5: '\u06A9\u0627\u0646\u062F\u0646\u06D5\u0648\u06D5 \u0648 \u0644\u0627\u06AF\u06C6\u062A\u06A9\u0631\u062F\u0646\u06CC \u0626\u06D5\u06CC \u0633\u06CC',
    ssCarRepair1: 'گۆڕینی ڕۆن',
    dsCarRepair1: 'گۆڕینی ڕۆنی ماتۆر',
    ssCarRepair2: 'چاککردنی بریک',
    dsCarRepair2: 'چاککردنی پادی بریک و دیسک',
    ssCarRepair3: 'چاککردنی ماتۆر',
    dsCarRepair3: 'دۆزینەوە و چاککردنی ماتۆر',
    ssCarRepair4: 'گۆڕینی تایر',
    dsCarRepair4: 'گۆڕین یان ڕێکخستنی تایر',
    ssCarRepair5: 'شوشتنی ئۆتۆمۆبیل',
    dsCarRepair5: 'شوشتنی ناوەوە و دەرەوە',
    ssMoving1: 'پاکێج کردن',
    dsMoving1: 'پاکێج کردنی شتومەک',
    ssMoving2: 'بارکردن',
    dsMoving2: 'بارکردنی کەلۆپەل بۆ تراک',
    ssMoving3: 'گواستنەوە',
    dsMoving3: 'گواستنەوەی شتومەک بۆ شوێنی نوێ',
    ssMoving4: 'دابەزاندن',
    dsMoving4: 'دابەزاندن و ڕێکخستنی شتومەک',
    ssMoving5: 'کۆکردنەوەی کەلۆپەل',
    dsMoving5: 'کۆکردنەوە و ڕێکخستنی کەلۆپەل',
    ssPlumbing1: 'چاککردنی لوله',
    dsPlumbing1: 'چاککردنی لوله‌ی ئاو',
    ssPlumbing2: 'پاککردنی ڕێژاو',
    dsPlumbing2: 'کردنەوەی ڕێژاوی گیراو',
    ssPlumbing3: 'گەرمکەری ئاو',
    dsPlumbing3: 'دامەزراندن یان چاککردنی گەرمکەری ئاو',
    ssPlumbing4: 'چاککردنی هەنجیر',
    dsPlumbing4: 'چاککردنی هەنجیرەکان',
    ssPlumbing5: 'چاککردنی توالێت',
    dsPlumbing5: 'چاککردن یان گۆڕینی توالێت',
    ssElectrical1: 'وایەرکێشان',
    dsElectrical1: 'وایەری کارەبا',
    ssElectrical2: 'پریز و کلید',
    dsElectrical2: 'چاککردنی پریز و کلید',
    ssElectrical3: 'دانانی ڕوناکی',
    dsElectrical3: 'دانانی ڕوناکی و چرای نوێ',
    ssElectrical4: 'چاککردنی پانێڵ',
    dsElectrical4: 'چاککردنی پانێڵی کارەبا',
    ssElectrical5: 'باده‌نی سەقف',
    dsElectrical5: 'دانان یان چاککردنی باده‌نی سەقف',
    ssCleaning1: 'پاککردنی ماڵ',
    dsCleaning1: 'پاککردنی تەواوی ماڵ',
    ssCleaning2: 'پاککردنی نووسینگه',
    dsCleaning2: 'پاککردنی نووسینگه و شوێنی کار',
    ssCleaning3: 'پاککردنی قوڵ',
    dsCleaning3: 'پاککردنی قوڵی هەموو شوێن',
    ssCleaning4: 'پاککردنی فەرش',
    dsCleaning4: 'شوشتن و پاککردنی فەرش',
    ssCleaning5: 'پاککردنی پەنجەره',
    dsCleaning5: 'پاککردنی پەنجەره و شووشه',
    ssPainting1: 'ڕەنگکردنی ناوەوە',
    dsPainting1: 'ڕەنگکردنی دیوار و ژووری ناوەوە',
    ssPainting2: 'ڕەنگکردنی دەرەوە',
    dsPainting2: 'ڕەنگکردنی دیوار و دەرەوەی باڵاخانه',
    ssPainting3: 'وۆڵ پیپەر',
    dsPainting3: 'دانان و لابردنی وۆڵ پیپەر',
    ssPainting4: 'لابردنی ڕەنگ',
    dsPainting4: 'لابردنی ڕەنگی کۆن',
    ssPainting5: 'ڕەنگکردنی سەقف',
    dsPainting5: 'ڕەنگکردنی سەقف و شوێنی بەرز',
    ssITSup1: 'چاککردنی کۆمپیوته‌ر',
    dsITSup1: 'چاککردنی هاردویر و سۆفتویر',
    ssITSup2: 'ڕێکخستنی تۆڕ',
    dsITSup2: 'ڕێکخستنی تۆڕ و وای فای',
    ssITSup3: 'لابردنی ڤایرۆس',
    dsITSup3: 'لابردنی ڤایرۆس و بەرنامه‌ی زیانبار',
    ssITSup4: 'گەڕاندنەوەی داتا',
    dsITSup4: 'گەڕاندنەوەی فایلە ونبووەکان',
    ssITSup5: 'دامەزراندنی بەرنامه',
    dsITSup5: 'دامەزراندن و ڕێکخستنی بەرنامه',
    ssTutoring1: 'وانەی بیرکاری',
    dsTutoring1: 'جەبر، ئەندازە و ژمێرە',
    ssTutoring2: 'وانەی زانست',
    dsTutoring2: 'فیزیک، کیمیا و زیندەزانی',
    ssTutoring3: 'وانەی زمان',
    dsTutoring3: 'فێربوونی زمانی نوێ',
    ssTutoring4: 'ئامادەکاری تاقیکردنەوە',
    dsTutoring4: 'ئامادەکاری تاقیکردنەوە و خوێندن',
    ssTutoring5: 'بەرنامه‌سازی',
    dsTutoring5: 'فێربوونی بەرنامه‌سازی و کۆدینگ',
    dCarRepair: '\u0645\u0627\u062A\u06C6\u0631\u060C \u0628\u0631\u06CC\u06A9 \u0648 \u0632\u06CC\u0627\u062A\u0631',
    dMoving: '\u06A9\u06D5\u0644\u0648\u067E\u06D5\u0644 \u0648 \u0633\u0646\u062F\u0648\u0648\u0642',
    dPlumbing: '\u0644\u0648\u0648\u0644\u06D5 \u0648 \u067E\u06CE\u06A9\u0647\u0627\u062A\u06D5\u06A9\u0627\u0646',
    dElectrical: '\u0648\u0627\u06CC\u06D5\u0631 \u0648 \u0686\u0627\u06A9\u06A9\u0631\u062F\u0646\u06D5\u0648\u06D5',
    dCleaning: '\u0645\u0627\u06B5 \u0648 \u0646\u0648\u0648\u0633\u06CC\u0646\u06AF\u06D5',
    dPainting: '\u0646\u0627\u0648\u06D5\u0648\u06D5 \u0648 \u062F\u06D5\u0631\u06D5\u0648\u06D5',
    dITSup: '\u06A9\u06C6\u0645\u067E\u06CC\u0648\u062A\u06D5\u0631 \u0648 \u062A\u06C6\u0695\u06D5\u06A9\u0627\u0646',
    dTutoring: '\u0626\u06D5\u06A9\u0627\u062F\u06CC\u0645\u06CC \u0648 \u0634\u0627\u0631\u06D5\u0632\u0627\u06CC\u06CC',
  },
};

function t(k) {
  var r = _s[_lang];
  if (r && r[k]) return r[k];
  if (_s.en[k]) return _s.en[k];
  return k;
}

function fmt(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function tr() {
  var els = document.querySelectorAll('[data-i18n]');
  for (var i = 0; i < els.length; i++) {
    var k = els[i].getAttribute('data-i18n');
    els[i].textContent = t(k);
  }
  var phs = document.querySelectorAll('[data-i18n-pl]');
  for (var i = 0; i < phs.length; i++) {
    var k = phs[i].getAttribute('data-i18n-pl');
    phs[i].placeholder = t(k);
  }
  var tis = document.querySelectorAll('[data-i18n-t]');
  for (var i = 0; i < tis.length; i++) {
    var k = tis[i].getAttribute('data-i18n-t');
    tis[i].title = t(k);
  }
}

// ---- SCREEN ROUTER ----
function show(id) {
  var all = document.querySelectorAll('.screen');
  for (var i = 0; i < all.length; i++) all[i].classList.add('hidden');
  document.getElementById('s-' + id).classList.remove('hidden');
}

// ---- SERVICES ----
var svc = [
  { id: 1, sk: 'sCarRepair', dk: 'dCarRepair', icon: '\uD83D\uDE97' },
  { id: 2, sk: 'sMoving', dk: 'dMoving', icon: '\uD83D\uDCE6' },
  { id: 3, sk: 'sPlumbing', dk: 'dPlumbing', icon: '\uD83D\uDD27' },
  { id: 4, sk: 'sElectrical', dk: 'dElectrical', icon: '\u26A1' },
  { id: 5, sk: 'sCleaning', dk: 'dCleaning', icon: '\uD83E\uDDFA' },
  { id: 6, sk: 'sPainting', dk: 'dPainting', icon: '\uD83C\uDFE0' },
  { id: 7, sk: 'sITSup', dk: 'dITSup', icon: '\uD83D\uDCBB' },
  { id: 8, sk: 'sTutoring', dk: 'dTutoring', icon: '\uD83C\uDF93' },
  { id: 9, sk: 'sAC', dk: 'dAC', icon: '\u2744\uFE0F' },
];

var subSvc = {
  1: [
    { id: 101, sk: 'ssCarRepair1', dk: 'dsCarRepair1', icon: '\uD83D\uDEE2\uFE0F' },
    { id: 102, sk: 'ssCarRepair2', dk: 'dsCarRepair2', icon: '\uD83D\uDEE0\uFE0F' },
    { id: 103, sk: 'ssCarRepair3', dk: 'dsCarRepair3', icon: '\uD83D\uDD29' },
    { id: 104, sk: 'ssCarRepair4', dk: 'dsCarRepair4', icon: '\uD83D\uDD04' },
    { id: 105, sk: 'ssCarRepair5', dk: 'dsCarRepair5', icon: '\uD83E\uDDFC' },
  ],
  2: [
    { id: 201, sk: 'ssMoving1', dk: 'dsMoving1', icon: '\uD83D\uDCE6' },
    { id: 202, sk: 'ssMoving2', dk: 'dsMoving2', icon: '\uD83D\uDE9A' },
    { id: 203, sk: 'ssMoving3', dk: 'dsMoving3', icon: '\uD83D\uDE9B' },
    { id: 204, sk: 'ssMoving4', dk: 'dsMoving4', icon: '\uD83D\uDCCB' },
    { id: 205, sk: 'ssMoving5', dk: 'dsMoving5', icon: '\uD83E\uDE9A' },
  ],
  3: [
    { id: 301, sk: 'ssPlumbing1', dk: 'dsPlumbing1', icon: '\uD83D\uDEB0' },
    { id: 302, sk: 'ssPlumbing2', dk: 'dsPlumbing2', icon: '\uD83D\uDDC1\uFE0F' },
    { id: 303, sk: 'ssPlumbing3', dk: 'dsPlumbing3', icon: '\u2615' },
    { id: 304, sk: 'ssPlumbing4', dk: 'dsPlumbing4', icon: '\uD83D\uDEB0' },
    { id: 305, sk: 'ssPlumbing5', dk: 'dsPlumbing5', icon: '\uD83D\uDEBD' },
  ],
  4: [
    { id: 401, sk: 'ssElectrical1', dk: 'dsElectrical1', icon: '\u26A1' },
    { id: 402, sk: 'ssElectrical2', dk: 'dsElectrical2', icon: '\uD83D\uDD0C' },
    { id: 403, sk: 'ssElectrical3', dk: 'dsElectrical3', icon: '\uD83D\uDCA1' },
    { id: 404, sk: 'ssElectrical4', dk: 'dsElectrical4', icon: '\uD83D\uDEE0\uFE0F' },
    { id: 405, sk: 'ssElectrical5', dk: 'dsElectrical5', icon: '\uD83C\uDFAF' },
  ],
  5: [
    { id: 501, sk: 'ssCleaning1', dk: 'dsCleaning1', icon: '\uD83C\uDFE0' },
    { id: 502, sk: 'ssCleaning2', dk: 'dsCleaning2', icon: '\uD83C\uDFE2' },
    { id: 503, sk: 'ssCleaning3', dk: 'dsCleaning3', icon: '\u2728' },
    { id: 504, sk: 'ssCleaning4', dk: 'dsCleaning4', icon: '\uD83E\uDDF8' },
    { id: 505, sk: 'ssCleaning5', dk: 'dsCleaning5', icon: '\uD83E\uDDE9' },
  ],
  6: [
    { id: 601, sk: 'ssPainting1', dk: 'dsPainting1', icon: '\uD83C\uDFE0' },
    { id: 602, sk: 'ssPainting2', dk: 'dsPainting2', icon: '\uD83C\uDFE1' },
    { id: 603, sk: 'ssPainting3', dk: 'dsPainting3', icon: '\uD83D\uDDBC\uFE0F' },
    { id: 604, sk: 'ssPainting4', dk: 'dsPainting4', icon: '\uD83D\uDDD1\uFE0F' },
    { id: 605, sk: 'ssPainting5', dk: 'dsPainting5', icon: '\uD83C\uDFF6\uFE0F' },
  ],
  7: [
    { id: 701, sk: 'ssITSup1', dk: 'dsITSup1', icon: '\uD83D\uDCBB' },
    { id: 702, sk: 'ssITSup2', dk: 'dsITSup2', icon: '\uD83C\uDF10' },
    { id: 703, sk: 'ssITSup3', dk: 'dsITSup3', icon: '\uD83E\uDDA0' },
    { id: 704, sk: 'ssITSup4', dk: 'dsITSup4', icon: '\uD83D\uDCBE' },
    { id: 705, sk: 'ssITSup5', dk: 'dsITSup5', icon: '\uD83D\uDCBD' },
  ],
  8: [
    { id: 801, sk: 'ssTutoring1', dk: 'dsTutoring1', icon: '\u2797' },
    { id: 802, sk: 'ssTutoring2', dk: 'dsTutoring2', icon: '\uD83D\uDD2C' },
    { id: 803, sk: 'ssTutoring3', dk: 'dsTutoring3', icon: '\uD83C\uDF0D' },
    { id: 804, sk: 'ssTutoring4', dk: 'dsTutoring4', icon: '\uD83D\uDCDD' },
    { id: 805, sk: 'ssTutoring5', dk: 'dsTutoring5', icon: '\uD83D\uDCBB' },
  ],
  9: [
    { id: 901, sk: 'ssAC1', dk: 'dsAC1', icon: '\uD83E\uDDF9' },
    { id: 902, sk: 'ssAC2', dk: 'dsAC2', icon: '\uD83E\uDDEA' },
    { id: 903, sk: 'ssAC3', dk: 'dsAC3', icon: '\uD83D\uDD27' },
    { id: 904, sk: 'ssAC4', dk: 'dsAC4', icon: '\uD83D\uDCE6' },
    { id: 905, sk: 'ssAC5', dk: 'dsAC5', icon: '\u2699\uFE0F' },
  ],
};

// ---- DOM READY ----
document.addEventListener('DOMContentLoaded', function () {
  try {

  // Language cards
  var lcs = document.querySelectorAll('.lang-card');
  for (var i = 0; i < lcs.length; i++) {
    lcs[i].addEventListener('click', function () {
      var code = this.getAttribute('data-lang');
      _lang = code;
      try { localStorage.setItem('profit_lang', code); } catch (e) {}
      document.getElementById('signupForm').style.display = '';
      document.getElementById('signupSuccess').classList.add('hidden');
      show('signup');
      initSignup();
    });
  }

  // Nav links
  var navs = document.querySelectorAll('[data-sc]');
  for (var i = 0; i < navs.length; i++) {
    navs[i].addEventListener('click', function (e) {
      e.preventDefault();
      var t = this.getAttribute('data-sc');
      if (t === 'signup') {
        document.getElementById('signupForm').style.display = '';
        document.getElementById('signupSuccess').classList.add('hidden');
      }
      show(t);
      if (t === 'login') initLogin();
      if (t === 'home') initHome();
      if (t === 'profile') initProfile();
      if (t === 'settings') initSettings();
      if (t === 'subservices') initSubServices(_lastSvcId);
      if (t === 'signup') tr();
      if (t === 'language') tr();
    });
  }

  // Route
  var langSaved = false;
  try { langSaved = !!localStorage.getItem('profit_lang'); } catch (e) {}

  if (_user) {
    show('home');
    initHome();
  } else if (langSaved) {
    show('signup');
    initSignup();
  } else {
    show('language');
    tr();
  }

  // Safety fallback: ensure at least one screen is visible
  var anyVisible = false;
  var all = document.querySelectorAll('.screen');
  for (var i = 0; i < all.length; i++) { if (!all[i].classList.contains('hidden')) { anyVisible = true; break; } }
  if (!anyVisible) { show('language'); tr(); }

  } catch(e) { show('language'); tr(); }
});

// ---- SIGNUP ----
function initSignup() {
  tr();
  var form = document.getElementById('signupForm');
  var fn = document.getElementById('fn');
  var em = document.getElementById('em');
  var ph = document.getElementById('ph');
  var pw = document.getElementById('pw');
  var ad = document.getElementById('ad');

  var ef = {
    fn: document.getElementById('fnE'),
    em: document.getElementById('emE'),
    ph: document.getElementById('phE'),
    pw: document.getElementById('pwE'),
    ad: document.getElementById('adE'),
  };

  function err(inp, el, m) { inp.classList.add('error'); el.textContent = m; }
  function clr(inp, el) { inp.classList.remove('error'); el.textContent = ''; }

  function vn() {
    var v = fn.value.trim();
    if (!v) { err(fn, ef.fn, t('errFullNameReq')); return false; }
    if (v.length < 2) { err(fn, ef.fn, t('errFullNameLen')); return false; }
    clr(fn, ef.fn); return true;
  }
  function ve() {
    var v = em.value.trim();
    if (!v) { err(em, ef.em, t('errEmailReq')); return false; }
    if (v.indexOf('@') < 1 || v.indexOf('.') < 3) { err(em, ef.em, t('errEmailValid')); return false; }
    clr(em, ef.em); return true;
  }
  function vp() {
    var v = ph.value.trim();
    if (!v) { err(ph, ef.ph, t('errPhoneReq')); return false; }
    clr(ph, ef.ph); return true;
  }
  function vpw() {
    var v = pw.value;
    if (!v) { err(pw, ef.pw, t('errPassReq')); return false; }
    if (v.length < 6) { err(pw, ef.pw, t('errPassLen')); return false; }
    clr(pw, ef.pw); return true;
  }
  function va() {
    var v = ad.value.trim();
    if (!v) { err(ad, ef.ad, t('errAddrReq')); return false; }
    if (v.length < 5) { err(ad, ef.ad, t('errAddrLen')); return false; }
    clr(ad, ef.ad); return true;
  }

  var vv = [vn, ve, vp, vpw, va];

  fn.addEventListener('blur', vn);
  em.addEventListener('blur', ve);
  ph.addEventListener('blur', vp);
  pw.addEventListener('blur', vpw);
  ad.addEventListener('blur', va);
  fn.addEventListener('input', function () { clr(fn, ef.fn); });
  em.addEventListener('input', function () { clr(em, ef.em); });
  ph.addEventListener('input', function () { clr(ph, ef.ph); });
  pw.addEventListener('input', function () { clr(pw, ef.pw); });
  ad.addEventListener('input', function () { clr(ad, ef.ad); });

  // ---- GPS ----
  var dl = document.getElementById('dl');
  var li = document.getElementById('li');
  var ls = document.getElementById('ls');

  function rg(lat, lng) {
    var u = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng + '&addressdetails=1';
    return fetch(u, { headers: { 'Accept-Language': _lang } })
      .then(function (r) { return r.json(); })
      .then(function (d) { return d && d.display_name ? d.display_name : lat.toFixed(5) + ', ' + lng.toFixed(5); });
  }

  function detectLoc() {
    if (!navigator.geolocation) { ls.textContent = t('notSupported'); ls.className = 'loc-status error'; return; }
    dl.classList.add('loading');
    li.textContent = '...';
    ls.textContent = t('detecting');
    ls.className = 'loc-status';

    navigator.geolocation.getCurrentPosition(
      function (pos) {
        rg(pos.coords.latitude, pos.coords.longitude)
          .then(function (n) {
            ad.value = n; clr(ad, ef.ad);
            ls.textContent = t('detected'); ls.className = 'loc-status success';
            dl.classList.remove('loading'); li.textContent = '\u25CF';
          })
          .catch(function () {
            ad.value = pos.coords.latitude.toFixed(5) + ', ' + pos.coords.longitude.toFixed(5);
            ls.textContent = t('coordsFilled'); ls.className = 'loc-status success';
            dl.classList.remove('loading'); li.textContent = '\u25CF';
          });
      },
      function (e) {
        var m = t('unavailable');
        if (e.code === 1) m = t('denied');
        else if (e.code === 2) m = t('unavailable');
        else if (e.code === 3) m = t('timeout');
        ls.textContent = m; ls.className = 'loc-status error';
        dl.classList.remove('loading'); li.textContent = '\u25CB';
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  if (dl) dl.addEventListener('click', detectLoc);

  // ---- SUBMIT ----
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    for (var i = 0; i < vv.length; i++) { if (!vv[i]()) ok = false; }
    if (!ok) return;
    _user = {
      fullName: fn.value.trim(),
      email: em.value.trim(),
      phone: ph.value.trim(),
      address: ad.value.trim(),
      password: pw.value,
    };
    // Add to all-users list (replace if email exists)
    var found = false;
    for (var k = 0; k < _allUsers.length; k++) {
      if (_allUsers[k].email.toLowerCase() === _user.email.toLowerCase()) {
        _allUsers[k] = _user; found = true; break;
      }
    }
    if (!found) _allUsers.push(_user);
    try { localStorage.setItem('profit_users', JSON.stringify(_allUsers)); } catch (e) {}
    try { localStorage.setItem('profit_user', JSON.stringify(_user)); } catch (e) {}
    form.style.display = 'none';
    document.getElementById('signupSuccess').classList.remove('hidden');
  });

  document.getElementById('goHome').addEventListener('click', function () {
    show('home');
    initHome();
  });
}

// ---- LOGIN ----
function initLogin() {
  tr();
  var form = document.getElementById('loginForm');
  var em = document.getElementById('lem');
  var pw = document.getElementById('lpw');
  var emE = document.getElementById('lemE');
  var pwE = document.getElementById('lpwE');
  var ge = document.getElementById('ge');
  var de = document.getElementById('de');

  var found = _user;
  if (!found) {
    try { var s = localStorage.getItem('profit_user'); if (s) found = JSON.parse(s); } catch (e) {}
  }
  de.textContent = _allUsers.length + ' user' + (_allUsers.length !== 1 ? 's' : '') + ' in db' + (_user ? ' | logged: ' + _user.email : '');

  function vi() {
    if (!em.value.trim()) { em.classList.add('error'); emE.textContent = t('errEmailReq'); return false; }
    em.classList.remove('error'); emE.textContent = ''; return true;
  }
  function vpw() {
    if (!pw.value) { pw.classList.add('error'); pwE.textContent = t('errPassReq'); return false; }
    pw.classList.remove('error'); pwE.textContent = ''; return true;
  }

  em.addEventListener('blur', vi);
  pw.addEventListener('blur', vpw);
  em.addEventListener('input', function () { em.classList.remove('error'); emE.textContent = ''; ge.textContent = ''; });
  pw.addEventListener('input', function () { pw.classList.remove('error'); pwE.textContent = ''; ge.textContent = ''; });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    ge.textContent = '';
    if (!vi() || !vpw()) return;
    // Search all registered users for this email
    var f = null;
    for (var k = 0; k < _allUsers.length; k++) {
      if (_allUsers[k].email.toLowerCase() === em.value.trim().toLowerCase()) {
        f = _allUsers[k]; break;
      }
    }
    // Also check profit_user as fallback for backward compat
    if (!f) {
      try { var s = localStorage.getItem('profit_user'); if (s) { var p = JSON.parse(s); if (p.email.toLowerCase() === em.value.trim().toLowerCase()) f = p; } } catch (e) {}
    }
    if (!f) { ge.textContent = t('errNoAccount'); return; }
    if (f.password !== undefined && pw.value !== f.password) { pw.classList.add('error'); pwE.textContent = t('errWrongPass'); return; }
    _user = f;
    form.style.display = 'none';
    document.getElementById('loginSuccess').classList.remove('hidden');
    setTimeout(function () { show('home'); initHome(); }, 1200);
  });
}

// ---- HOME ----
function initHome() {
  tr();
  if (_user) document.getElementById('un').textContent = _user.fullName.split(' ')[0];

  var g = document.getElementById('sg');
  var si = document.getElementById('si');

  function render(f) {
    var h = '';
    var term = (f || '').toLowerCase().trim();
    for (var i = 0; i < svc.length; i++) {
      var s = svc[i];
      var nm = t(s.sk);
      var ds = t(s.dk);
      if (term && nm.toLowerCase().indexOf(term) < 0 && ds.toLowerCase().indexOf(term) < 0) continue;
      var price = _prices[s.id];
      var priceHtml = price ? '<span class="card-price">د.ع ' + fmt(price) + '</span>' : '';
      h += '<div class="service-card" data-id="' + s.id + '">' +
        '<div class="card-icon">' + s.icon + '</div>' +
        '<h3>' + nm + '</h3>' +
        '<p>' + ds + '</p>' +
        priceHtml +
        '</div>';
    }
    if (!h) h = '<p class="no-results">' + t('searchNoResults') + '</p>';
    g.innerHTML = h;
    var cards = g.querySelectorAll('.service-card');
    for (var i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', function () {
        var id = parseInt(this.getAttribute('data-id'));
        if (subSvc[id]) {
          show('subservices');
          initSubServices(id);
        } else {
          for (var j = 0; j < svc.length; j++) {
            if (svc[j].id === id) { alert(t(svc[j].sk)); return; }
          }
        }
      });
    }
  }

  render();
  si.addEventListener('input', function () { render(this.value); });

  document.getElementById('settingsBtn').addEventListener('click', function (e) {
    e.preventDefault();
    show('settings');
    initSettings();
  });

  document.getElementById('profileBtn').addEventListener('click', function (e) {
    e.preventDefault();
    show('profile');
    initProfile();
  });

  document.getElementById('lo').addEventListener('click', function (e) {
    e.preventDefault();
    _user = null;
    show('language');
    tr();
  });
}

// ---- SUB-SERVICES ----
function initSubServices(svcId) {
  _lastSvcId = svcId;
  tr();
  var items = subSvc[svcId];
  var title = '';
  for (var i = 0; i < svc.length; i++) {
    if (svc[i].id === svcId) { title = t(svc[i].sk); break; }
  }
  document.getElementById('ssTitle').textContent = title;

  var g = document.getElementById('ssg');
  var h = '';
  for (var i = 0; i < items.length; i++) {
    var s = items[i];
    h += '<div class="service-card" data-id="' + s.id + '">' +
      '<div class="card-icon">' + (s.icon || '\uD83D\uDCCB') + '</div>' +
      '<h3>' + t(s.sk) + '</h3>' +
      '<p>' + t(s.dk) + '</p>' +
      (_prices[s.id] ? '<span class="card-price">د.ع ' + fmt(_prices[s.id]) + '</span>' : '') +
      '</div>';
  }
  g.innerHTML = h;

  var cards = g.querySelectorAll('.service-card');
  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
      var id = parseInt(this.getAttribute('data-id'));
      _lastSubSvcId = id;
      show('request');
      initRequest(id, svcId);
    });
  }
}

// ---- REQUEST ----
function initRequest(subId, svcId) {
  tr();
  var data = _user;
  if (!data) {
    try { var s = localStorage.getItem('profit_user'); if (s) data = JSON.parse(s); } catch (e) {}
  }
  if (!data) { show('home'); return; }

  var svcName = '';
  var subName = '';
  for (var i = 0; i < svc.length; i++) {
    if (svc[i].id === svcId) { svcName = t(svc[i].sk); break; }
  }
  var items = subSvc[svcId];
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === subId) { subName = t(items[i].sk); break; }
  }
  document.getElementById('reqTitle').textContent = svcName;
  document.getElementById('reqService').value = svcName + ' - ' + subName;
  var subPrice = _prices[subId];
  var mainPrice = _prices[svcId];
  var priceEl = document.getElementById('reqPrice');
  var priceGroup = document.getElementById('reqPriceGroup');
  if (subPrice || mainPrice) {
    priceEl.value = 'د.ع ' + fmt(subPrice || mainPrice);
    priceGroup.style.display = '';
  } else {
    priceGroup.style.display = 'none';
  }
  document.getElementById('reqName').value = data.fullName || '';
  document.getElementById('reqPhone').value = data.phone || '';
  document.getElementById('reqAddr').value = data.address || '';
  document.getElementById('reqDesc').value = '';
  document.getElementById('reqDescE').textContent = '';
  document.getElementById('reqImageE').textContent = '';
  document.getElementById('reqImageName').textContent = '';
  document.getElementById('reqImage').value = '';
  document.getElementById('reqLS').textContent = '';
  document.getElementById('reqLS').className = 'loc-status';
  document.getElementById('requestForm').style.display = '';
  document.getElementById('requestSuccess').classList.add('hidden');

  // Submit
  var form = document.getElementById('requestForm');
  var newForm = form.cloneNode(true);
  form.parentNode.replaceChild(newForm, form);

  // File input display (after clone)
  document.getElementById('reqImage').addEventListener('change', function () {
    var name = this.files && this.files[0] ? this.files[0].name : '';
    document.getElementById('reqImageName').textContent = name;
  });

  // GPS for request (after clone)
  var dl = document.getElementById('reqDL');
  var li = document.getElementById('reqLI');
  var ls = document.getElementById('reqLS');

  function rg(lat, lng) {
    var u = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng + '&addressdetails=1';
    return fetch(u, { headers: { 'Accept-Language': _lang } })
      .then(function (r) { return r.json(); })
      .then(function (d) { return d && d.display_name ? d.display_name : lat.toFixed(5) + ', ' + lng.toFixed(5); });
  }

  function detectLoc() {
    if (!navigator.geolocation) { ls.textContent = t('notSupported'); ls.className = 'loc-status error'; return; }
    dl.classList.add('loading');
    li.textContent = '...';
    ls.textContent = t('detecting');
    ls.className = 'loc-status';

    navigator.geolocation.getCurrentPosition(
      function (pos) {
        rg(pos.coords.latitude, pos.coords.longitude)
          .then(function (n) {
            document.getElementById('reqAddr').value = n;
            ls.textContent = t('detected'); ls.className = 'loc-status success';
            dl.classList.remove('loading'); li.textContent = '\u25CF';
          })
          .catch(function () {
            document.getElementById('reqAddr').value = pos.coords.latitude.toFixed(5) + ', ' + pos.coords.longitude.toFixed(5);
            ls.textContent = t('coordsFilled'); ls.className = 'loc-status success';
            dl.classList.remove('loading'); li.textContent = '\u25CF';
          });
      },
      function (e) {
        var m = t('unavailable');
        if (e.code === 1) m = t('denied');
        else if (e.code === 2) m = t('unavailable');
        else if (e.code === 3) m = t('timeout');
        ls.textContent = m; ls.className = 'loc-status error';
        dl.classList.remove('loading'); li.textContent = '\u25CB';
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  if (dl) {
    var newDl = dl.cloneNode(true);
    dl.parentNode.replaceChild(newDl, dl);
    newDl.addEventListener('click', detectLoc);
  }

  // Submit
  var form = document.getElementById('requestForm');
  var newForm = form.cloneNode(true);
  form.parentNode.replaceChild(newForm, form);

  newForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var desc = document.getElementById('reqDesc').value.trim();
    var img = document.getElementById('reqImage').files[0];
    var descE = document.getElementById('reqDescE');
    var imgE = document.getElementById('reqImageE');
    var ok = true;

    if (!desc) { descE.textContent = t('errDescReq'); ok = false; }
    else { descE.textContent = ''; }

    if (!img) { imgE.textContent = t('errImageReq'); ok = false; }
    else { imgE.textContent = ''; }

    if (!ok) return;

    // Save request - try API first, fallback to localStorage
    var addr = document.getElementById('reqAddr').value;
    var formData = new FormData();
    formData.append('description', desc);
    formData.append('svcName', svcName);
    formData.append('subName', subName);
    formData.append('userName', data.fullName);
    formData.append('phone', data.phone);
    formData.append('address', addr);
    formData.append('userEmail', data.email);
    if (img) formData.append('image', img);

    fetch(_apiBase + '/api/requests', { method: 'POST', body: formData })
      .then(function () {
        newForm.style.display = 'none';
        document.getElementById('requestSuccess').classList.remove('hidden');
      })
      .catch(function () {
        // Fallback to localStorage
        var reqs = [];
        try { var r = localStorage.getItem('profit_requests'); if (r) reqs = JSON.parse(r); } catch (e) {}
        reqs.push({
          id: Date.now(), svcId: svcId, subId: subId,
          svcName: svcName, subName: subName,
          description: desc, imageName: img ? img.name : '',
          userName: data.fullName, phone: data.phone, address: addr,
          email: data.email, date: new Date().toISOString(), status: 'pending',
        });
        try { localStorage.setItem('profit_requests', JSON.stringify(reqs)); } catch (e) {}
        newForm.style.display = 'none';
        document.getElementById('requestSuccess').classList.remove('hidden');
      });
  });

  document.getElementById('reqBackHome').addEventListener('click', function () {
    show('home');
    initHome();
  });
}

// ---- PROFILE ----
function initProfile() {
  tr();
  var data = _user;
  if (!data) {
    try { var s = localStorage.getItem('profit_user'); if (s) data = JSON.parse(s); } catch (e) {}
  }
  if (!data) return;

  document.getElementById('pa').textContent = (data.fullName || 'U').charAt(0).toUpperCase();

  var pf = document.getElementById('pf');
  var pe = document.getElementById('pe');
  var pp = document.getElementById('pp');
  var pda = document.getElementById('pda');

  pf.value = data.fullName || '';
  pe.value = data.email || '';
  pp.value = data.phone || '';
  pda.value = data.address || '';

  document.getElementById('profileForm').addEventListener('submit', function (e) {
    e.preventDefault();
    data.fullName = pf.value.trim();
    data.email = pe.value.trim();
    data.phone = pp.value.trim();
    data.address = pda.value.trim();
    _user = data;
    // Sync with all-users list
    for (var k = 0; k < _allUsers.length; k++) {
      if (_allUsers[k].email.toLowerCase() === data.email.toLowerCase()) {
        _allUsers[k] = data; break;
      }
    }
    try { localStorage.setItem('profit_users', JSON.stringify(_allUsers)); } catch (e) {}
    try { localStorage.setItem('profit_user', JSON.stringify(data)); } catch (e) {}
    alert(t('savedMsg'));
    show('home');
    initHome();
  });
}

// ---- SETTINGS ----
function initSettings() {
  tr();

  var items = document.querySelectorAll('.settings-lang-item');
  for (var i = 0; i < items.length; i++) {
    items[i].classList.remove('active');
    if (items[i].getAttribute('data-lang') === _lang) {
      items[i].classList.add('active');
    }
  }

  for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', function () {
      var code = this.getAttribute('data-lang');
      _lang = code;
      try { localStorage.setItem('profit_lang', code); } catch (e) {}
      var all = document.querySelectorAll('.settings-lang-item');
      for (var j = 0; j < all.length; j++) all[j].classList.remove('active');
      this.classList.add('active');
      tr();
    });
  }
}
