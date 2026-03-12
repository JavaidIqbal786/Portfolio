import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiMysql,
  SiTensorflow,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiGit,
  SiGithub,
  SiLinux,
  SiDocker,
  SiPostman,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import {
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
} from 'react-icons/hi';
import { FiServer, FiCpu, FiLock, FiTerminal } from 'react-icons/fi';

/* ═══════════════════════════════════════════════════════════════
   Skills data
   ─ Each item: { name, icon, level (0-100), color (optional) }
   ═══════════════════════════════════════════════════════════════ */

const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'HTML5', icon: SiHtml5, level: 95, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss, level: 92, color: '#1572B6' },
      { name: 'JavaScript', icon: SiJavascript, level: 90, color: '#F7DF1E' },
      { name: 'React', icon: SiReact, level: 88, color: '#61DAFB' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: SiNodedotjs, level: 85, color: '#339933' },
      { name: 'Express.js', icon: SiExpress, level: 83, color: '#888888' },
      { name: 'Python', icon: SiPython, level: 88, color: '#3776AB' },
      { name: 'REST APIs', icon: FiServer, level: 85, color: '#00b4d8' },
      { name: 'MySQL', icon: SiMysql, level: 80, color: '#4479A1' },
    ],
  },
  {
    category: 'AI & ML',
    items: [
      { name: 'Machine Learning', icon: FiCpu, level: 75, color: '#bd93f9' },
      { name: 'Deep Learning', icon: FiCpu, level: 72, color: '#ff6bcb' },
      { name: 'TensorFlow', icon: SiTensorflow, level: 70, color: '#FF6F00' },
      { name: 'Scikit-learn', icon: SiScikitlearn, level: 73, color: '#F7931E' },
      { name: 'NumPy', icon: SiNumpy, level: 80, color: '#013243' },
      { name: 'Pandas', icon: SiPandas, level: 82, color: '#150458' },
    ],
  },
  {
    category: 'Cybersecurity',
    items: [
      { name: 'Ethical Hacking', icon: HiOutlineShieldCheck, level: 75, color: '#00ff88' },
      { name: 'Penetration Testing', icon: FiLock, level: 72, color: '#ff5555' },
      { name: 'OWASP', icon: HiOutlineGlobeAlt, level: 70, color: '#00b4d8' },
      { name: 'Linux Security', icon: FiTerminal, level: 75, color: '#FCC624' },
      { name: 'Network Security', icon: HiOutlineShieldCheck, level: 70, color: '#bd93f9' },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git & GitHub', icon: SiGithub, level: 90, color: '#ffffff' },
      { name: 'VS Code', icon: VscVscode, level: 95, color: '#007ACC' },
      { name: 'Linux', icon: SiLinux, level: 78, color: '#FCC624' },
      { name: 'Docker', icon: SiDocker, level: 65, color: '#2496ED' },
      { name: 'Postman', icon: SiPostman, level: 85, color: '#FF6C37' },
    ],
  },
];

/* ── Top 8 skills for the proficiency bars section ─────────── */
export const topSkills = [
  { name: 'VS Code', level: 95 },
  { name: 'HTML5', level: 95 },
  { name: 'CSS3', level: 92 },
  { name: 'JavaScript', level: 90 },
  { name: 'Git & GitHub', level: 90 },
  { name: 'React', level: 88 },
  { name: 'Python', level: 88 },
  { name: 'Node.js', level: 85 },
];

export default skills;
