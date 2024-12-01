// @ts-nocheck
'use client'
import Image from "next/image";
import { useState, useEffect } from 'react'
import { ArrowRight, PawPrint, Users, Coins, MapPin, ChevronRight, BadgeDollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Poppins } from 'next/font/google'
// import ContractInteraction from '@/components/ContractInteraction'
import { getRecentReports, getAllRewards, getPetCollectionTasks } from '@/utils/db/action'
import Link from 'next/link'

const poppins = Poppins({ 
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  display: 'swap',
})


function AnimatedGlobe() {
  return (
    <div className="relative w-32 h-32 mx-auto mb-8">
      <div className="absolute inset-0 rounded-full bg-purple-500 opacity-20 animate-pulse"></div>
      <div className="absolute inset-2 rounded-full bg-purple-400 opacity-40 animate-ping"></div>
      <div className="absolute inset-4 rounded-full bg-purple-300 opacity-60 animate-spin"></div>
      <div className="absolute inset-6 rounded-full bg-purple-200 opacity-80 animate-bounce"></div>
      <PawPrint className="absolute inset-0 m-auto h-16 w-16 text-purple-600 animate-pulse" />
    </div>
  )
}

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [impactData, setImpactData] = useState({
    petsCollected: 0,
    reportsSubmitted: 0,
    tokensEarned: 0,
    valueRedeemed: 0
  });


  useEffect(() => {
    async function fetchImpactData() {
      try {
        const reports = await getRecentReports(100);  // Fetch last 100 reports
        const rewards = await getAllRewards();
        const tasks = await getPetCollectionTasks(100);  // Fetch last 100 tasks

        const petsCollected = tasks.reduce((total, task) => {
          const match = task.weight.match(/(\d+(\.\d+)?)/);
          const amount = match ? parseFloat(match[0]) : 0;
          return total + amount;
        }, 0);

        const reportsSubmitted = reports.length;
        const tokensEarned = rewards.reduce((total, reward) => total + (reward.points || 0), 0);
        const valueRedeemed = petsCollected * 0.5;  // Assuming 0.5 kg CO2 offset per kg of waste

        setImpactData({
          petsCollected: Math.round(petsCollected * 10) / 10, // Round to 1 decimal place
          reportsSubmitted,
          tokensEarned,
          valueRedeemed: Math.round(valueRedeemed * 10) / 10 // Round to 1 decimal place
        });
      } catch (error) {
        console.error("Error fetching impact data:", error);
        // Set default values in case of error
        setImpactData({
          petsCollected: 0,
          reportsSubmitted: 0,
          tokensEarned: 0,
          valueRedeemed: 0
        });
      }
    }

    fetchImpactData();
  }, []);

  const login = () => {
    setLoggedIn(true);
  };

  return (
    <div className={`container mx-auto px-4 py-16 ${poppins.className}`}>
      <section className="text-center mb-20">
        <AnimatedGlobe />
        <h1 className="text-6xl font-bold mb-6 text-gray-800 tracking-tight">
          Pet Save<span className="text-purple-600"> A platform for everyone</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Join our community by helping each make it efficient and rewarding!
        </p>
        {!loggedIn ? (
          <Button onClick={login} className="bg-purple-600 hover:bg-purple-700 text-white text-lg py-6 px-10 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105">
              Report Pet Lost
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        ) : (
          <Link href="/report">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white text-lg py-6 px-10 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105">
              Report Pet Lost
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        )}
      </section>

      <section className="grid md:grid-cols-3 gap-10 mb-20">
        <FeatureCard
          icon={PawPrint}
          title="Pet-Friendly"
          description="Contribute to a cleaner environment by reporting and collecting your stray Pets."
        />
        <FeatureCard
          icon={Coins}
          title="Earn Rewards"
          description="Get tokens for your contributions to pet finding efforts."
        />
        <FeatureCard
          icon={Users}
          title="Community-Driven"
          description="Be part of a growing community committed to sustainable practices."
        />
      </section>

      <section className="bg-white p-10 rounded-3xl shadow-lg mb-20">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Our Impact</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <ImpactCard title="Pets Saved" value={`200`} icon={PawPrint} />
          <ImpactCard title="Reports Submitted" value={`290`} icon={MapPin} />
          <ImpactCard title="Tokens Earned" value={`200`} icon={Coins} />
          <ImpactCard title="Value Redeemed" value={`100`} icon={BadgeDollarSign} />
        </div>
      </section>

      </div>

  );
}

  function ImpactCard({ title, value, icon: Icon }: { title: string; value: string | number; icon: React.ElementType }) {
    const formattedValue = typeof value === 'number' ? value.toLocaleString('en-US', { maximumFractionDigits: 1 }) : value;
    
    return (
      <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-md">
        <Icon className="h-10 w-10 text-purple-500 mb-4" />
        <p className="text-3xl font-bold mb-2 text-gray-800">{formattedValue}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    )
  }
  
  function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col items-center text-center">
        <div className="bg-purple-100 p-4 rounded-full mb-6">
          <Icon className="h-8 w-8 text-purple-600" />
        </div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    )
  }