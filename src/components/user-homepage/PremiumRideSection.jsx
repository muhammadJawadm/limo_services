import sideImg from '../../assets/mainpageside.png';

const services = [
  {
    step: 'Step 1',
    title: 'Point to Point',
    desc: "Your short trips are so friendly & enjoyable, you'll never ask are we there yet?",
  },
  {
    step: 'Step 2',
    title: 'Hourly',
    desc: 'Lavish and dynamic hourly car service that lets you set your own hours of luxury travel.',
  },
  {
    step: 'Step 3',
    title: 'Airport Transfer',
    desc: 'Our goal is to transform your airport transfer experience into effortless comfort with our top-notch fleet.',
  },
];

export default function PremiumRideSection() {
  return (
    <section className="py-16 px-8 md:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        {/* Left — Text Content */}
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
            Premium Ride-Hailing Services
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-lg">
            At limo we don't just offer rides – we offer experiences. Whether it's a smooth airport transfer,
            a glamorous limo for your special event, or a professional chauffeur who's all about your comfort.
            Explore our exclusive services now and ride Prestige.
          </p>

          {/* Step timeline */}
          <div className="flex flex-col">
            {services.map((s, i) => (
              <div key={i} className="flex items-start gap-5">
                {/* Left: circle + dashed line */}
                <div className="flex flex-col items-center">
                  {/* Outer ring */}
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {/* Inner dot */}
                    <div className="w-5 h-5 rounded-full bg-[#1a2b5e]" />
                  </div>
                  {/* Dashed connector — only between steps */}
                  {i < services.length - 1 && (
                    <div
                      className="flex-1 my-1"
                      style={{
                        width: '2px',
                        minHeight: '60px',
                        borderLeft: '2px dashed #1a2b5e',
                        opacity: 0.35,
                      }}
                    />
                  )}
                </div>

                {/* Right: step label + title + desc */}
                <div className="pb-8">
                  <p className="text-gray-400 text-xs mb-0.5">{s.step}</p>
                  <h3 className="font-bold text-[#1a2b5e] text-base mb-1">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Image */}
        <div className="flex-1 relative flex justify-center">
          <div className="relative w-full">
            <img
              src={sideImg}
              alt="Limo Service"
              className="rounded-xl w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
