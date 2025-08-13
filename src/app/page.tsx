import Home from '@/components/Home/Home';
import ExpertiseBanner from '@/components/ExpertiseBanner/ExpertiseBanner';
import ModernEquipment from '@/components/ModernEquipment/ModernEquipment';
import ComfortableRooms from '@/components/ComfortableRooms/ComfortableRooms';
import FullMedicationSupply from '@/components/FullMedicationSupply/FullMedicationSupply';
import AnesthesiaCare from '@/components/AnesthesiaCare/AnesthesiaCare';
import SurgeryDepartmentInfo from '@/components/SurgeryDepartmentInfo/SurgeryDepartmentInfo';


export default function HomePage() {
  return (
    <main>
      <Home />
      <ExpertiseBanner />
      <ModernEquipment />
      <ComfortableRooms />
      <FullMedicationSupply />
      <AnesthesiaCare />
      <SurgeryDepartmentInfo />
    </main>
  );
}