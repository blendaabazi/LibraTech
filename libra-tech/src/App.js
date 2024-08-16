import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Logout from './Logout';
import Register from './Register';
import Dashboard from './Dashboard';
import Autori from './Autori';
import Porosia from './Porosia';
import MjeteShkollore from './MjeteShkollore';
import Tipi from './Tipi';
import Libraria from './Libraria';
import Lokacioni from './Lokacioni';
import Furnizimi from './Furnizimi';
import Qyteti from './Qyteti';
import ProdhuesiMSh from './ProdhuesiMSh';
import ShtetiMSh from './ShtetiMSh';
import DimensionetMSh from './DimensionetMSh';
import Kategoria from './Kategoria';
import Gjuha from './Gjuha';
import ShtepiaBotuese from './ShtepiaBotuese';
import StafiGjinia from './StafiGjinia';
import StafiOrari from './StafiOrari';
import StafiSektori from './StafiSektori';
import Header from './Header';
import Shporta from './Shporta';
import NgjyraMSh from './NgjyraMSh';
import LibratSipasKategorise from './LibratSipasKategorise';
import KlientiRoli from './KlientiRoli';
import Klienti from './Klienti';
import Stafi from './Stafi';
import Home from './Home';
import ForgotPassword from './ForgotPassword';
import MjetetSipasTipit from './MjetetSipasTipit';
import KlientiGjinia from './KlientiGjinia';
import Libri from './Libri';
import DetajetELibrit from './DetajetELibrit';
import UserProfile from './UserProfile';
import DetajetEMjetit from './DetajetEMjetit';
import KlientiQyteti from './KlientiQyteti';
import { PorosiaService } from './PorosiaService';
import StafiSchedule from './StafiSchedule';
import ProtectedRoute from './ProtectedRoute';  // Import the ProtectedRoute component
import { useAuth } from './AuthProvider';
import { AuthProvider } from './AuthProvider';
import WishList from './WishList';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path='/mjeteShkollore' element={<MjeteShkollore />} />
              <Route path='/libri' element={<Libri />} />
              <Route path="/tipi" element={<ProtectedRoute requiredRoli="Admin"><Tipi /></ProtectedRoute>} />
              <Route path="/autori" element={<ProtectedRoute requiredRoli="Admin"><Autori /></ProtectedRoute>} />
              <Route path="/shporta" element={<ProtectedRoute requiredRoli="User"><Shporta /></ProtectedRoute>} />
              <Route path="/wishlist" element={<ProtectedRoute requiredRoli="User"><WishList /></ProtectedRoute>} />

              <Route path="/libraria" element={<ProtectedRoute requiredRoli="Admin"><Libraria /></ProtectedRoute>} />
              <Route path='/lokacioni' element={<Lokacioni />} />
              {/* <Route path="/porosia" element={<ProtectedRoute requiredRoli="Admin"><Porosia /></ProtectedRoute>} /> */}
              <Route path="/porosiaService" element={<ProtectedRoute requiredRoli="Admin"><PorosiaService /></ProtectedRoute>} />
              <Route path='/qyteti' element={<Qyteti />} />
              <Route path='/furnizimi' element={<Furnizimi />} />
              <Route path="/prodhuesiMSh" element={<ProtectedRoute requiredRoli="Admin"><ProdhuesiMSh /></ProtectedRoute>} />
              <Route path="/shtetiMSh" element={<ProtectedRoute requiredRoli="Admin"><ShtetiMSh /></ProtectedRoute>} />
              <Route path="/dimensionetMSh" element={<ProtectedRoute requiredRoli="Admin"><DimensionetMSh /></ProtectedRoute>} />
              <Route path="/kategoria" element={<ProtectedRoute requiredRoli="Admin"><Kategoria /></ProtectedRoute>} />
              <Route path="/gjuha" element={<ProtectedRoute requiredRoli="Admin"><Gjuha /></ProtectedRoute>} />
              <Route path="/shtepiaBotuese" element={<ProtectedRoute requiredRoli="Admin"><ShtepiaBotuese /></ProtectedRoute>} />

              <Route path="/njesia" element={<ProtectedRoute requiredRoli="Admin"><NgjyraMSh /></ProtectedRoute>} />
              <Route path="/stafiGjinia" element={<ProtectedRoute requiredRoli="Admin"><StafiGjinia /></ProtectedRoute>} />
              <Route path="/stafiOrari" element={<ProtectedRoute requiredRoli="Admin"><StafiOrari /></ProtectedRoute>} />
              <Route path="/stafiSektori" element={<ProtectedRoute requiredRoli="Admin"><StafiSektori /></ProtectedRoute>} />
              <Route path='/libri/:id' element={<DetajetELibrit />} />
              <Route path='/mjeteShkollore/:id' element={<DetajetEMjetit />} />
              <Route path="/kategoria/:kategoria/librat" element={<LibratSipasKategorise />} />
              <Route path="/tipi/:tipi/MjeteShkollore" element={<MjetetSipasTipit />} />


              <Route path="/klientigjinia" element={<ProtectedRoute requiredRoli="Admin"><KlientiGjinia /></ProtectedRoute>} />
              <Route path="/klientiqyteti" element={<ProtectedRoute requiredRoli="Admin"><KlientiQyteti /></ProtectedRoute>} />
              <Route path="/klientiroli" element={<ProtectedRoute requiredRoli="Admin"><KlientiRoli /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute requiredRoli="Admin"><Dashboard /></ProtectedRoute>} />
              <Route path="/Home" element={<ProtectedRoute requiredRolis={["Admin", "User"]}><Home /></ProtectedRoute>} />
            </>
          )}
           <Route path='/libri' element={<Libri />} />
           <Route path='/Kategoria' element={<Kategoria />} />

           <Route path='/porosia' element={<Porosia />} />
           <Route path="/klienti" element={<Klienti/>} />
           <Route path="/stafi" element={<Stafi/>} />
           <Route path='/mjeteShkollore' element={<MjeteShkollore />} />
           <Route path="/logout" element={<Logout />} />
           <Route path='/UserProfile' element={<UserProfile />} />
           <Route path="/forgotpassword" element={<ForgotPassword />} />
           <Route path="/stafischedule" element={<StafiSchedule />} />





        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './login';
// import Logout from './Logout';
// import Register from './Register';
// import Dashboard from './Dashboard';
// import Autori from './Autori';
// import Porosia from './Porosia';
// import MjeteShkollore from './MjeteShkollore';
// import Tipi from './Tipi';
// import Libraria from './Libraria';
// import Lokacioni from './Lokacioni';
// import Furnizimi from './Furnizimi';
// import Qyteti from './Qyteti';
// import ProdhuesiMSh from './ProdhuesiMSh';
// import ShtetiMSh from './ShtetiMSh';
// import DimensionetMSh from './DimensionetMSh';
// import Kategoria from './Kategoria';
// import Gjuha from './Gjuha';
// import ShtepiaBotuese from './ShtepiaBotuese';
// import NrFaqeve from './NrFaqeve';
// import StafiGjinia from './StafiGjinia';
// import StafiOrari from './StafiOrari';
// import StafiSektori from './StafiSektori';
// import Header from './Header';
// import Shporta from './Shporta';
// import NgjyraMSh from './NgjyraMSh';
// import LibratSipasKategorise from './LibratSipasKategorise';
// import KlientiRoli from './KlientiRoli';
// import Klienti from './Klienti';
// import Stafi from './Stafi';
// import Home from './Home';
// import ForgotPassword from './ForgotPassword';
// import MjetetSipasTipit from './MjetetSipasTipit';
// import KlientiGjinia from './KlientiGjinia';
// import Libri from './Libri';
// import DetajetELibrit from './DetajetELibrit';
// import UserProfile from './UserProfile';
// import DetajetEMjetit from './DetajetEMjetit';
// import KlientiQyteti from './KlientiQyteti';
// import { PorosiaService } from './PorosiaService';
// import StafiSchedule from './StafiSchedule';
// import ProtectedRoute from './ProtectedRoute';  // Import the ProtectedRoute component
// import { useAuth } from './AuthProvider';
// import { AuthProvider } from './AuthProvider';
// import WishList from './WishList';

// function App() {
//   const { isAuthenticated } = useAuth();

//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {!isAuthenticated ? (
//             <>
//               <Route path="/" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/forgotpassword" element={<ForgotPassword />} />
//               <Route path="*" element={<Navigate to="/" />} />
//             </>
//           ) : (
//             <>
//               <Route path="/" element={<Home />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/forgotpassword" element={<ForgotPassword />} />
//               <Route path='/mjeteShkollore' element={<MjeteShkollore />} />
//               <Route path='/libri' element={<Libri />} />
//               <Route path="/tipi" element={<ProtectedRoute requiredRoli="Admin"><Tipi /></ProtectedRoute>} />
//               <Route path="/autori" element={<ProtectedRoute requiredRoli="Admin"><Autori /></ProtectedRoute>} />
//               <Route path="/shporta" element={<ProtectedRoute requiredRoli="User"><Shporta /></ProtectedRoute>} />
//               <Route path="/libraria" element={<ProtectedRoute requiredRoli="Admin"><Libraria /></ProtectedRoute>} />
//               <Route path='/lokacioni' element={<Lokacioni />} />
//               {/* <Route path="/porosia" element={<ProtectedRoute requiredRoli="Admin"><Porosia /></ProtectedRoute>} /> */}
//               <Route path="/porosiaService" element={<ProtectedRoute requiredRoli="Admin"><PorosiaService /></ProtectedRoute>} />
//               <Route path='/qyteti' element={<Qyteti />} />
//               <Route path='/furnizimi' element={<Furnizimi />} />
//               <Route path="/prodhuesiMSh" element={<ProtectedRoute requiredRoli="Admin"><ProdhuesiMSh /></ProtectedRoute>} />
//               <Route path="/shtetiMSh" element={<ProtectedRoute requiredRoli="Admin"><ShtetiMSh /></ProtectedRoute>} />
//               <Route path="/dimensionetMSh" element={<ProtectedRoute requiredRoli="Admin"><DimensionetMSh /></ProtectedRoute>} />
//               <Route path="/kategoria" element={<ProtectedRoute requiredRoli="Admin"><Kategoria /></ProtectedRoute>} />
//               <Route path="/gjuha" element={<ProtectedRoute requiredRoli="Admin"><Gjuha /></ProtectedRoute>} />
//               <Route path="/shtepiaBotuese" element={<ProtectedRoute requiredRoli="Admin"><ShtepiaBotuese /></ProtectedRoute>} />
//               <Route path="/StafiSchedule" element={<ProtectedRoute requiredRoli="Admin"><StafiSchedule /></ProtectedRoute>} />
//               <Route path="/nrfaqeve" element={<ProtectedRoute requiredRoli="Admin"><NrFaqeve /></ProtectedRoute>} />
//               <Route path="/njesia" element={<ProtectedRoute requiredRoli="Admin"><NgjyraMSh /></ProtectedRoute>} />
//               <Route path="/stafiGjinia" element={<ProtectedRoute requiredRoli="Admin"><StafiGjinia /></ProtectedRoute>} />
//               <Route path="/stafiOrari" element={<ProtectedRoute requiredRoli="Admin"><StafiOrari /></ProtectedRoute>} />
//               <Route path="/stafiSektori" element={<ProtectedRoute requiredRoli="Admin"><StafiSektori /></ProtectedRoute>} />
//               <Route path='/libri/:id' element={<DetajetELibrit />} />
//               <Route path='/mjeteShkollore/:id' element={<DetajetEMjetit />} />
//               <Route path="/kategoria/:kategoria/librat" element={<LibratSipasKategorise />} />
//               <Route path="/tipi/:tipi/MjeteShkollore" element={<MjetetSipasTipit />} />
//               <Route path='/UserProfile' element={<UserProfile />} />

//               <Route path="/klienti" element={<Klienti />} />
//               <Route path="/stafi" element={<Stafi />} />
//               <Route path="/klientigjinia" element={<ProtectedRoute requiredRoli="Admin"><KlientiGjinia /></ProtectedRoute>} />
//               <Route path="/klientiqyteti" element={<ProtectedRoute requiredRoli="Admin"><KlientiQyteti /></ProtectedRoute>} />
//               <Route path="/klientiroli" element={<ProtectedRoute requiredRoli="Admin"><KlientiRoli /></ProtectedRoute>} />
//               <Route path="/dashboard" element={<ProtectedRoute requiredRoli="Admin"><Dashboard /></ProtectedRoute>} />
//               <Route path="/Home" element={<ProtectedRoute requiredRolis={["Admin", "User"]}><Home /></ProtectedRoute>} />
//             </>
//           )}
//            <Route path='/libri' element={<Libri />} />
//            <Route path='/porosia' element={<Porosia />} />
//            <Route path="/klienti" element={<Klienti/>} />
//            <Route path="/stafi" element={<Stafi/>} />
//            <Route path='/mjeteShkollore' element={<MjeteShkollore />} />
//            <Route path="/logout" element={<Logout />} />
//            <Route path="/wishList" element={<WishList />} />



//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


