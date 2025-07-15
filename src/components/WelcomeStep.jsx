import icon1 from '../Images/icon1.png';
import icon2 from '../Images/icon2.png';
import icon3 from '../Images/icon3.png';

export const WelcomeStep = ({ onNext }) => {
  const steps = [
    {
      id: 2,
      title: "Select only the tasks that apply",
      description: "2",
      icon: (
        <img 
          src={icon2} 
          alt="Select Tasks" 
          width="60" 
          height="36"
        />
      ),
    },
    {
      id: 3,
      title: "Customize your checklist",
      description: "3",
      icon: (
        <img 
          src={icon3} 
          alt="Customize Checklist" 
          width="40" 
          height="36"
        />
      ),
    },
    {
      id: 4,
      title: "Download your customized checklist",
      description: "4",
      icon: (
        <img 
          src={icon3} 
          alt="Download Checklist" 
          width="40" 
          height="36"
        />
      ),
    },
  ];

  return (
    <div className="">
      <div className="">
        <h2 className=" lg:text-[55px] sm:text-[45px] text-[34px] text-center text-[#535252]  font-bold xl:mb-[70px] mb-[50px]">
          How it works
        </h2>

        <div className="grid md:grid-cols-4 md:gap-6 gap-14 ">



          <div
              
              className="flex gap-4 justify-between relative flex-col items-center cursor-pointer backdrop-blur-lg rounded-xl pb-10 pt-[80px] lg:px-10 xl:px-[30px] px-5 bg-[#fcf1e6] hover:opacity-[0.7] hover:shadow-xl ease-in-out transition-all duration-500"
            >
              <p className="text-3xl font-semibold text-[#fff] w-full max-w-[70px] xl:max-w-[100px] h-[70px] xl:h-[100px] flex items-center justify-center rounded-full bg-[#1f7333] absolute xl:top-[-45px] top-[-25px] left-0 right-0 m-auto ">
                1
              </p>
              <h3 className="lg:text-[24px] text-[20px] text-center  font-normal text-[#535252]">
                Choose a <br/> Category
              </h3>

              <div className="text-[#535252]">
                 <img 
         src={icon1}
          alt="Choose Category" 
          width="55" 
          height="46"
        />
              </div>

            </div>


          {steps.map((step) => (
            <div
              key={step.id}
              className="flex gap-4 justify-between relative flex-col items-center cursor-pointer backdrop-blur-lg rounded-xl pb-10 pt-[80px] lg:px-10 xl:px-[30px] px-5 bg-[#fcf1e6] hover:opacity-[0.7] hover:shadow-xl ease-in-out transition-all duration-500"
            >
              <p className="text-3xl font-semibold text-[#fff] w-full max-w-[70px] xl:max-w-[100px] h-[70px] xl:h-[100px] flex items-center justify-center rounded-full bg-[#1f7333] absolute xl:top-[-45px] top-[-25px] left-0 right-0 m-auto ">
                {step.description}
              </p>
              <h3 className="lg:text-[24px] text-[20px] text-center  font-normal text-[#535252]">
                {step.title}
              </h3>

              <div className="text-[#535252]">{step.icon}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={onNext}
          className="bg-[#1f7333] text-white font-semibold rounded-[10px] px-14 py-4 text-[26px] hover:bg-[#89c497] transition-colors"
        >
          Start now
        </button>
      </div>
    </div>
  );
};















// // export const WelcomeStep = ({ onNext, steps }) => {
// //   return (
// //     <div className="space-y-8 max-w-2xl mx-auto">
// //       <div className="text-center">
// //         <h1 className="text-4xl font-bold text-teal-500">mesudar.com</h1>
// //         <p className="text-lg mt-2">making gabboim's lives easier</p>
// //       </div>
      
// //       <div className="mt-8 space-y-4">
// //         <p className="text-lg">Running a shul comes with countless responsibilities.</p>
// //         <p className="text-lg">Mesudar.com is a <span className="text-teal-500 font-medium">free tool</span> that makes it easy for Gabboim to create customized checklists for every task — from Shabbos prep and cleaning checklists to Yom Tov management.</p>
// //       </div>
      
// //       <div className="mt-10">
// //         <h2 className="text-xl font-semibold mb-4">How It Works:</h2>
// //         <div className="space-y-3">
// //           {steps.map((step) => (
// //             <div key={step.id} className="rounded-full border-2 border-teal-500 py-3 px-6">
// //               <p className="text-center">{step.id}. {step.title}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
      
// //       <div className="mt-6 flex justify-end">
// //         <button 
// //           onClick={onNext}
// //           className="bg-teal-500 text-white rounded-full px-8 py-4 text-lg hover:bg-teal-600 transition-colors"
// //         >
// //           let's go
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };