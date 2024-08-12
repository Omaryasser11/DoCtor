import React from 'react'
import Landing from '../../Component/DrDianaPage/LandingSection'
import Clients from '../../Component/DrDianaPage/Clients'
import CosmeticSurgerySection from '../../Component/DrDianaPage/CosmeticSurgerySection'
import Section3 from '../../Component/DrDianaPage/Section3'
import FamilyHobbiesSection from '../../Component/DrDianaPage/FamilyHobbiesSection'
function Dr() {
  return (
    <section>
      <Landing></Landing>
      <Clients></Clients>
      <CosmeticSurgerySection></CosmeticSurgerySection>
      <Section3></Section3>
      <FamilyHobbiesSection></FamilyHobbiesSection>
    </section>
  )
}

export default Dr