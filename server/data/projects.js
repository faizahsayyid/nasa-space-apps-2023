const SAMPLE_PROJECTS = [
  {
    name: "Volatiles Investigating Polar Exploration Rover",
    description:
      "Volatiles Investigating Polar Exploration Rover (VIPER) is a mobile robot that will go to the South Pole of the Moon to get a close-up view of the location and concentration of water ice that could eventually be harvested to sustain human exploration on the Moon, Mars — and beyond.",
    domains: "polar,exploration,moon",
    user_id: "Ames Research Center",
    external_url: "https://science.nasa.gov/mission/viper/",
    star_sign: null,
  },
  {
    name: "HelioSwarm",
    description:
      "The HelioSwarm Observatory transforms our understanding of space plasma turbulence using an innovative mission concept, comprised of a hub spacecraft plus eight smaller node spacecraft, to collect data on multiple physical scales simultaneously.",
    domains: "plasma,turbulance,spacecraft",
    user_id: "Ames Research Center",
    external_url: "https://eos.unh.edu/helioswarm",
    star_sign: null,
  },
  {
    name: "Stratospheric Observatory for Infrared Astronomy",
    description:
      "Stratospheric Observatory for Infrared Astronomy (SOFIA), is a Boeing 747SP aircraft. Flying into the stratosphere at 38,000-45,000 feet puts SOFIA above 99 percent of Earth’s infrared-blocking atmosphere, allowing astronomers to study the solar system and beyond in ways that are not possible with ground-based telescopes.",
    domains: "earth,atmosphere,stratosphere",
    user_id: "Ames Research Center",
    external_url: "https://science.nasa.gov/mission/sofia/",
    star_sign: null,
  },
  {
    name: "Small Spacecraft Systems Virtual Institute",
    description:
      "NASA's Small Spacecraft Systems Virtual Institute (S3VI) uses web technologies, databases, and virtual collaboration tools to collect, organize, and disseminate small spacecraft knowledge for the benefit of NASA and the community.",
    domains: "web technologies,databases,spacecraft",
    user_id: "Ames Research Center",
    external_url: "https://www.nasa.gov/smallsat-institute/",
    star_sign: null,
  },
  {
    name: "Small Spacecraft Technology Program",
    description:
      "Small Spacecraft Technology Program (SSTP) expands the ability to execute unique missions through rapid development and demonstration of capabilities for small spacecraft applicable to exploration, science and the commercial space sector.",
    domains: "development,commercial,exploration",
    user_id: "Ames Research Center",
    external_url: "https://www.nasa.gov/smallspacecraft/",
    star_sign: null,
  },
  {
    name: "Interface Region Imaging Spectrograph",
    description:
      "Interface Region Imaging Spectrograph (IRIS) explorer's goal is to understand how the solar atmosphere is energized.",
    domains: "imaging,spectrograph,sun",
    user_id: "Ames Research Center",
    external_url: "https://iris.gsfc.nasa.gov/",
    star_sign: null,
  },
  {
    name: "Flight Opportunities",
    description:
      "Flight Opportunities (FOP) facilitates rapid demonstration of promising technologies for space exploration and the expansion of space commerce through suborbital testing with industry flight providers.",
    domains: "flight,test,suborbital",
    user_id: "Ames Research Center",
    external_url:
      "https://www.nasa.gov/stmd-flight-opportunities/about-flight-opportunities/#:~:text=Flight%20Opportunities%20rapidly%20demostrates%20promising,testing%20with%20industry%20flight%20providers.",
    star_sign: null,
  },
  {
    name: "Orion",
    description:
      "Ames provides multiple technologies and a range of engineering support for the Artemis program, including for the design, analysis, development, and testing of the Orion space capsule.",
    domains: "design,analysis,development",
    user_id: "Ames Research Center",
    external_url: "https://www.nasa.gov/specials/orionfirstflight/",
    star_sign: null,
  },
  {
    name: "Rectify/Arcjet Upgrade",
    description:
      "The Arcjet Facility, used to simulate the aerothermodynamic heating that a spacecraft endures during hypersonic re-entry, is being modernized and upgraded.",
    domains: "thermal,development,reentry",
    user_id: "Ames Research Center",
    external_url: "https://www.nasa.gov/ames/arcjet-complex/",
    star_sign: null,
  },
  {
    name: "TrickHLA",
    description:
      "TrickHLA: An IEEE 1516 High Level Architecture (HLA) Simulation Interoperability Standard Implementation for Trick Base Simulations",
    domains: "simulation,interoperability,implementation",
    user_id: "dandexter",
    external_url: "https://github.com/nasa/TrickHLA",
    star_sign: null,
  },
  {
    name: "openmct",
    description:
      "Open MCT (Open Mission Control Technologies) is a next-generation mission control framework for visualization of data on desktop and mobile devices. It is developed at NASA's Ames Research Center, and is being used by NASA for data analysis of spacecraft missions, as well as planning and operation of experimental rover systems. As a generalizable and open source framework, Open MCT could be used as the basis for building applications for planning, operation, and analysis of any systems producing telemetry data.",
    domains: "mission control,visualization,framework",
    user_id: "VWoeltjen",
    external_url: "https://github.com/nasa/openmct",
    star_sign: null,
  },
  {
    name: "cumulus-message-adapter",
    description:
      "cumulus-message-adapter is a command-line interface for preparing and outputting Cumulus Messages for Cumulus Tasks. cumulus-message-adapter helps Cumulus developers integrate a task into a Cumulus Workflow.",
    domains: "integration,commad line,messaging",
    user_id: "Jkovarik",
    external_url: "https://github.com/nasa/cumulus-message-adapter",
    star_sign: null,
  },
  {
    name: "harmony",
    description:
      "Application for providing services for Earth observation data in the cloud using standards-based APIs",
    domains: "integration,collaboration,aws",
    user_id: "chris-durbin",
    external_url: "https://github.com/nasa/harmony",
    star_sign: null,
  },
  {
    name: "cumulus",
    description:
      "Cumulus is an open source cloud-based data ingest, archive, distribution, and management framework developed for NASA's future Earth Science data streams. This repo supports the development, deployment, and testing of Cumulus and supplies useful tips on configuration, workflow management, and operations. To learn more about Cumulus and NASA's Earth Observing System Data and Information System (EOSDIS) cloud initiatives go to More Information.",
    domains: "cloud based,data management,earth science",
    user_id: "marchuffnagle",
    external_url: "https://github.com/nasa/cumulus",
    star_sign: null,
  },
  {
    name: "hybridq",
    description:
      "HybriQ is a highly extensible platform designed to provide a common framework to integrate multiple state-of-the-art techniques to simulate large scale quantum circuits on a variety of hardware. HybridQ provides tools to manipulate, develop, and extend noiseless and noisy circuits for different hardware architectures. HybridQ also supports large-scale high-performance computing (HPC) simulations, automatically balancing workload among different processor nodes and enabling the use of multiple backends to maximize parallel efficiency. Everything is then glued together by a simple and expressive language that allows seamless switching from one technique to another as well as from one hardware to the next, without the need to write lengthy translations, thus greatly simplifying the development of new hybrid algorithms and techniques.",
    domains:
      "quantum simulation,extensible framework,high performance computing",
    user_id: "dagart",
    external_url: "https://github.com/nasa/hybridq",
    star_sign: null,
  },
  {
    name: "ow_simulator",
    descripion:
      "OceanWATERS is a ROS-based physical and visual simulation of a lander on the Jovian moon Europa. It is intended as a testbed to aid in producing software that could help enable autonomous lander operations on ocean worlds of the Solar System, such as Europa and Enceladus.",
    domains: "simulation,autonomous,ocean worlds",
    user_id: "Samahu",
    external_url: "https://github.com/nasa/ow_simulator",
    star_sign: null,
  },
  {
    name: "progpy",
    description:
      "The NASA Prognostics Python Packages (ProgPy) are a set of open-sourced python packages supporting research and development of prognostics and health management and predictive maintenance tools. They implement architectures and common functionality of prognostics, supporting researchers and practitioners.",
    domains: "prognostics,predictive,prognostics",
    user_id: "teubert",
    external_url: "https://github.com/nasa/progpy",
    star_sign: null,
  },
  {
    name: "OnAIR",
    description:
      "The On-board Artificial Intelligence Research (OnAIR) Platform is a framework that enables AI algorithms written in Python to iteract with NASA's cFS. It is intended to explore research concepts in autonomous operations in a simulated environment.",
    domains: "artificial intelligence,autonomous,core flight software",
    user_id: "asgibson",
    external_url: "https://github.com/nasa/OnAIR",
    star_sign: null,
  },
  {
    name: "ncompare",
    description:
      "Compare the structure of two NetCDF files at the command line. ncompare generates a view of the matching and non-matching groups and variables between two NetCDF datasets.",
    domains: "data comparison,netcdf analysis,structural validation",
    user_id: "danielfromearth",
    external_url: "https://github.com/nasa/ncompare",
    star_sign: null,
  },
  {
    name: "radbelt",
    description:
      "This is small Python library to model the fluxes of charged particles trapped in the Van Allen belt. It provides a fast, simple, and convenient Python interface to the International Geomagnetic Reference Field (IGRF) model and NASA's AE-8/AP-8 models of electron and proton fluxes, which are both implemented in Fortran. The package is integrated with the Astropy ecosysem for easy conversion of coordinate systems, time scales, and units. With this package, it is easy and fast to determine the flux of particles above any given energy, at any position, at any time.",
    domains: "particle flux modeling,van allen belt,astropy",
    user_id: "lpsinger",
    external_url: "https://github.com/nasa/radbelt",
    star_sign: null,
  },
];

module.exports = { SAMPLE_PROJECTS };
