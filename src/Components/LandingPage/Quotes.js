import React from 'react';
import { css } from 'emotion'
import WaliedSoliman from "../Images/faceShot/pic0.png";
import SalmaSalman from "../Images/faceShot/pic1.png";
import MohamedLachemi from "../Images/faceShot/pic2.png";
import RoblehJama from "../Images/faceShot/pic3.png";
import HindAlAbadleh from "../Images/faceShot/pic0.png";
import MuzParkhani from "../Images/faceShot/pic1.png";
import AliMutaza from "../Images/faceShot/pic2.png";

export const quotes= {
  0: {
    testimonial: "MAX has amazingly brought together an entire community and I eagerly look forward to meeting MAX Aspiring Professionals and doing my part to help their careers.",
    name: "Walied Soliman",
    role: "Partner and Global Chair",
    company: "Norton Rose Fulbright LLP",
    image:
      <img
        className={css`
          width: 100%;
          height: 100%;
          padding: 2%;
          border-radius: 50%;
          @media (min-width: 960px){
            text-align:center;
        }`}
        src={WaliedSoliman}
        alt={"Walied Soliman Testimonial"}
      />
  },
  1: {
    testimonial: "MAX has made a tremendous contribution to the community by bringing people together to support and motivate aspiring professionals, and celebrate achievements of deserving individuals who are making contributions today and for the future of a diverse and inclusive Canada.",
    name: "Salma Salman",
    role: "CFO of Wealth Finance",
    company: "TD Bank Group",
    image:
      <img
        className={css`
          width: 100%;
          height: 100%;
          padding: 2%;
          border-radius: 50%;
          @media (min-width: 960px){
            text-align:center;
        }`}
        src={SalmaSalman}
        alt={"Salma Salman Testimonial"}
      />
  },
  2: {
    testimonial: "I know first-hand the power of mentorship to drive personal and professional growth. That’s why I joined MAX Aspire: to share my experience and encourage and support Canada’s next generation of leaders and impact-makers.",
    name: "Dr. Mohamed Lachemi",
    role: "President and Vice Chancellor",
    company: "Ryerson University",
    image:
      <img
        className={css`
          width: 100%;
          height: 100%;
          padding: 2%;
          border-radius: 50%;
          @media (min-width: 960px){
            text-align:center;
        }`}
        src={MohamedLachemi}
        alt={"Dr. Mohamed Lachemi Testimonial"}
      />
  },
  3: {
    testimonial: "I am pleased to be able to give back and guide young professionals on MAX Aspire. MAX is a thoughtful organization looking to inspire and enable Muslims to be strong, positive and productive contributors to society.",
    name: "Robleh Jama",
    role: "Director of Product",
    company: "Shopify",
    image:
      <img
        className={css`
          width: 100%;
          height: 100%;
          padding: 2%;
          border-radius: 50%;
          @media (min-width: 960px){
            text-align:center;
        }`}
        src={RoblehJama}
        alt={"Robleh Jama Testimonial"}
      />
  },
  4: {
    testimonial: "Kudos to the MAX team for leading a one-of-a kind organization that celebrates and mentors Muslim professionals aspiring to become the best in their respective fields.",
    name: "Dr. Hind Al-Abadleh",
    role: "Professor in Department of Chemistry and Biochemistry",
    company: "Wilfrid Laurier University",
    image:
      <img
        className={css`
          width: 100%;
          height: 100%;
          padding: 2%;
          border-radius: 50%;
          @media (min-width: 960px){
            text-align:center;
        }`}
        src={HindAlAbadleh}
        alt={"Dr. Hind Al-Abadleh Testimonial"}
      />
  },
  5: {
    testimonial: "God willing, the Max Aspire platform will enable you to steepen your learning curve and leapfrog your professional & personal life.",
    name: "Muz Parkhani",
    role: "Director, Global Thematic Return",
    company: "OMERS",
    iimage:
      <img
        className={css`
          width: 100%;
          height: 100%;
          padding: 2%;
          border-radius: 50%;
          @media (min-width: 960px){
            text-align:center;
        }`}
        src={MuzParkhani}
        alt={"Muz Parkhani Testimonial"}
      />
  },
  6: {
    testimonial: "MAX’s admirable mission of accelerating the advancement of students and professionals in our community has produced tremendous results already in a short period. I am excited to contribute further inspiration and leadership to help MAX Aspire members broaden their networks and grow both personally and professionally.",
    name: "Ali Mutaza",
    role: "IoT Sales Leader for Canada",
    company: "Amazon Web Services",
    image:
      <img
        className={css`
          width: 100%;
          height: 100%;
          padding: 2%;
          border-radius: 50%;
          @media (min-width: 960px){
            text-align:center;
        }`}
        src={AliMutaza}
        alt={"Ali Mutaza Testimonial"}
      />
  }
}
  