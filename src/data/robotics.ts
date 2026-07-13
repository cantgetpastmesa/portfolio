/**
 * ROBOCOL / robotics page content.
 * ── HOW TO EDIT ─────────────────────────────────────────────
 * Machines: swap the spec values marked TODO for the real ones.
 * Instagram: paste full post URLs (from any account) into `instagramPosts`
 * — e.g. "https://www.instagram.com/p/ABC123xyz/" — and they will embed.
 * Log: presidency milestones; add/remove entries freely.
 */

type Bilingual = { en: string; es: string };

export type Machine = {
  id: string;
  figure: string;
  name: string;
  class: Bilingual;
  image: string;
  /** line drawings get shown on a white "print sheet"; renders too */
  description: Bilingual;
  specs: { label: Bilingual; value: string }[];
  stack: string[];
  competition?: string;
};

export const machines: Machine[] = [
  {
    id: "rover",
    figure: "FIG. 01",
    name: "ROVER",
    class: { en: "PLANETARY EXPLORATION ROVER", es: "ROVER DE EXPLORACIÓN PLANETARIA" },
    image: "/robocol/rover.png",
    description: {
      en: "Six-wheeled rover with a 5-DOF manipulator arm, built for international rover challenge circuits: autonomous traversal, equipment servicing, and science operations over unstructured terrain.",
      es: "Rover de seis ruedas con brazo manipulador de 5 GDL, construido para circuitos internacionales de retos de rovers: navegación autónoma, mantenimiento de equipos y operaciones científicas sobre terreno no estructurado.",
    },
    specs: [
      { label: { en: "DRIVE", es: "TRACCIÓN" }, value: "6×6 rocker-bogie" }, // TODO: confirm
      { label: { en: "MANIPULATOR", es: "MANIPULADOR" }, value: "5-DOF arm + gripper" }, // TODO: confirm
      { label: { en: "PERCEPTION", es: "PERCEPCIÓN" }, value: "Stereo cam · IMU · GPS" }, // TODO: confirm
    ],
    stack: ["ROS 2", "Python", "C++", "OpenCV"],
    competition: "URC / ERC", // TODO: confirm
  },
  {
    id: "submarine",
    figure: "FIG. 02",
    name: "ROV",
    class: { en: "UNDERWATER REMOTELY OPERATED VEHICLE", es: "VEHÍCULO SUBMARINO OPERADO REMOTAMENTE" },
    image: "/robocol/submarine.png",
    description: {
      en: "Underwater ROV with a vectored thruster layout and sealed electronics tube, designed for inspection and manipulation tasks in submarine robotics competitions.",
      es: "ROV submarino con configuración de propulsores vectorizados y tubo de electrónica sellado, diseñado para tareas de inspección y manipulación en competencias de robótica submarina.",
    },
    specs: [
      { label: { en: "THRUSTERS", es: "PROPULSORES" }, value: "Vectored, 6×" }, // TODO: confirm
      { label: { en: "HULL", es: "CASCO" }, value: "Sealed acrylic tube" }, // TODO: confirm
      { label: { en: "SENSORS", es: "SENSORES" }, value: "Depth · IMU · camera" }, // TODO: confirm
    ],
    stack: ["ROS", "Python", "Embedded C"],
    competition: "RoboSub", // TODO: confirm
  },
  {
    id: "drone",
    figure: "FIG. 03",
    name: "UAV",
    class: { en: "AUTONOMOUS AERIAL VEHICLE", es: "VEHÍCULO AÉREO AUTÓNOMO" },
    image: "/robocol/drone.png",
    description: {
      en: "Quadrotor platform with carbon-fiber arms for autonomous flight research: waypoint missions, computer-vision-guided landing, and payload delivery experiments.",
      es: "Plataforma cuadrirrotor con brazos de fibra de carbono para investigación de vuelo autónomo: misiones por waypoints, aterrizaje guiado por visión por computador y experimentos de entrega de carga.",
    },
    specs: [
      { label: { en: "FRAME", es: "ESTRUCTURA" }, value: "Quad, carbon arms" }, // TODO: confirm
      { label: { en: "AUTOPILOT", es: "AUTOPILOTO" }, value: "Pixhawk / PX4" }, // TODO: confirm
      { label: { en: "VISION", es: "VISIÓN" }, value: "Downward cam + companion" }, // TODO: confirm
    ],
    stack: ["PX4", "MAVLink", "Python"],
  },
];

export type LogEntry = {
  date: string; // e.g. "2025-01"
  title: Bilingual;
  body: Bilingual;
};

/** Presidency / team milestones — TODO: replace with real dates & stories. */
export const presidencyLog: LogEntry[] = [
  {
    date: "——",  // TODO: real date (e.g. "2025-01")
    title: { en: "Elected president of ROBOCOL", es: "Elegido presidente de ROBOCOL" },
    body: {
      en: "Took over leadership of Universidad de los Andes' robotics team — coordinating mechanical, electronic, software and administrative divisions.",
      es: "Asumí el liderazgo del equipo de robótica de la Universidad de los Andes — coordinando las divisiones mecánica, electrónica, de software y administrativa.",
    },
  },
  {
    date: "——",  // TODO: real date (e.g. "2025-01")
    title: { en: "Competition season", es: "Temporada de competencia" },
    body: {
      en: "Placeholder — add the competitions the team attended under your term, results, and what broke at 2 a.m. the night before.",
      es: "Placeholder — agrega las competencias a las que asistió el equipo durante tu periodo, los resultados y qué se dañó a las 2 a.m. la noche anterior.",
    },
  },
  {
    date: "——",  // TODO: real date (e.g. "2025-01")
    title: { en: "Growing the team", es: "Crecimiento del equipo" },
    body: {
      en: "Placeholder — recruitment, workshops, sponsorships, outreach. The parts of leading a team that never show up in the photos.",
      es: "Placeholder — reclutamiento, talleres, patrocinios, divulgación. Las partes de liderar un equipo que nunca salen en las fotos.",
    },
  },
];

/** Team stats shown in the hero HUD — TODO: real numbers. */
export const teamStats: { label: Bilingual; value: string }[] = [
  { label: { en: "MEMBERS", es: "MIEMBROS" }, value: "60+" }, // TODO
  { label: { en: "DIVISIONS", es: "DIVISIONES" }, value: "4" }, // TODO
  { label: { en: "ACTIVE PROJECTS", es: "PROYECTOS ACTIVOS" }, value: "3" },
  { label: { en: "FOUNDED", es: "FUNDADO" }, value: "2010" },
];

/**
 * Instagram posts to embed (any public account). Full URLs, e.g.:
 *   "https://www.instagram.com/p/C8yUvXwPqRs/"
 * Leave empty to show the offline-feed notice.
 */
export const instagramPosts: string[] = [
  "https://www.instagram.com/p/DGnpGkohhGm",
  "https://www.instagram.com/p/DJKmW0rRQiw",
  "https://www.instagram.com/p/DKKoRGfOfT6",
  "https://www.instagram.com/p/DRDbOOJkZC6",
];
