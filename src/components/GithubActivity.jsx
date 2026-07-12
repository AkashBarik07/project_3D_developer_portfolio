// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// import { styles } from "../styles";
// import { SectionWrapper } from "../hoc";
// import { textVariant } from "../utils/motion";

// const MONTH_LABELS = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
// ];

// // GitHub's own level->color scale (dark theme)
// const LEVEL_COLORS = [
//     "#161b22", // 0 - no contributions
//     "#0e4429", // 1
//     "#006d32", // 2
//     "#26a641", // 3
//     "#39d353", // 4 - most contributions
// ];

// const GithubActivity = ({
//     username = "AkashBarik07",
//     privateReposNote = "",
// }) => {
//     const [weeks, setWeeks] = useState([]);
//     const [monthLabels, setMonthLabels] = useState([]);
//     const [total, setTotal] = useState(0);
//     const [year, setYear] = useState(null);
//     const [status, setStatus] = useState("loading"); // loading | ready | error

//     useEffect(() => {
//         let isMounted = true;

//         const fetchContributions = async () => {
//             setStatus("loading");
//             try {
//                 // Public, no-auth-required API that mirrors GitHub's contribution graph.
//                 // "last" gives a rolling 12-month window, matching your reference image.
//                 const res = await fetch(
//                     `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
//                 );

//                 if (!res.ok) throw new Error("Failed to fetch contributions");

//                 const data = await res.json();
//                 if (!isMounted) return;

//                 const contributions = data.contributions || [];
//                 if (contributions.length === 0) throw new Error("No data returned");

//                 // --- Build week columns, Sunday-first, like GitHub's real graph ---
//                 const byDate = {};
//                 contributions.forEach((c) => {
//                     byDate[c.date] = c;
//                 });

//                 const sortedDates = contributions.map((c) => new Date(c.date));
//                 const firstDate = new Date(Math.min(...sortedDates));
//                 const lastDate = new Date(Math.max(...sortedDates));

//                 // Pad the start back to the previous Sunday so weeks align in columns
//                 const start = new Date(firstDate);
//                 start.setDate(start.getDate() - start.getDay());

//                 const dayCells = [];
//                 const cursor = new Date(start);
//                 while (cursor <= lastDate) {
//                     const iso = cursor.toISOString().slice(0, 10);
//                     const entry = byDate[iso];
//                     dayCells.push({
//                         date: iso,
//                         count: entry ? entry.count : 0,
//                         level: entry ? entry.level : 0,
//                         month: cursor.getMonth(),
//                     });
//                     cursor.setDate(cursor.getDate() + 1);
//                 }

//                 const weekCols = [];
//                 for (let i = 0; i < dayCells.length; i += 7) {
//                     weekCols.push(dayCells.slice(i, i + 7));
//                 }

//                 // Figure out which week column each month label should sit above
//                 const labels = [];
//                 let lastMonth = null;
//                 weekCols.forEach((week, colIndex) => {
//                     const firstDayOfWeek = week[0];
//                     if (firstDayOfWeek.month !== lastMonth) {
//                         labels.push({
//                             index: colIndex,
//                             label: MONTH_LABELS[firstDayOfWeek.month],
//                         });
//                         lastMonth = firstDayOfWeek.month;
//                     }
//                 });

//                 setWeeks(weekCols);
//                 setMonthLabels(labels);
//                 setTotal(
//                     data.total?.[Object.keys(data.total).pop()] ??
//                     contributions.reduce((sum, c) => sum + c.count, 0)
//                 );
//                 setYear(lastDate.getFullYear());
//                 setStatus("ready");
//             } catch (err) {
//                 console.error("GithubActivity fetch error:", err);
//                 if (isMounted) setStatus("error");
//             }
//         };

//         fetchContributions();
//         return () => {
//             isMounted = false;
//         };
//     }, [username]);

//     return (
//         <motion.div variants={textVariant()}>
//             <p className={`${styles.sectionSubText} text-center`}>My Consistency</p>
//             <h2 className={`${styles.sectionHeadText} text-center`}>
//                 Github Activity.
//             </h2>

//             <div className='mt-10 w-full overflow-x-auto'>
//                 <div className='min-w-[750px] bg-[#0d1117] border border-white/10 rounded-2xl p-6'>
//                     {status === "loading" && (
//                         <div className='h-[180px] flex items-center justify-center text-secondary'>
//                             Loading contribution graph...
//                         </div>
//                     )}

//                     {status === "error" && (
//                         <div className='h-[180px] flex items-center justify-center text-secondary text-center px-4'>
//                             Couldn't load contributions for "{username}". Double-check the
//                             GitHub username.
//                         </div>
//                     )}

//                     {status === "ready" && (
//                         <>
//                             {/* Month labels row */}
//                             <div className='relative h-5 mb-1 ml-8'>
//                                 {monthLabels.map(({ index, label }) => (
//                                     <span
//                                         key={`${label}-${index}`}
//                                         className='absolute text-white text-sm'
//                                         style={{ left: `${index * 15}px` }}
//                                     >
//                                         {label}
//                                     </span>
//                                 ))}
//                             </div>

//                             <div className='flex gap-[3px]'>
//                                 {/* Day-of-week labels */}
//                                 <div className='flex flex-col gap-[3px] mr-2 justify-between text-secondary text-xs pt-[1px]'>
//                                     <span className='h-3'></span>
//                                     <span className='h-3'>Mon</span>
//                                     <span className='h-3'></span>
//                                     <span className='h-3'>Wed</span>
//                                     <span className='h-3'></span>
//                                     <span className='h-3'>Fri</span>
//                                     <span className='h-3'></span>
//                                 </div>

//                                 {/* Weeks grid */}
//                                 <div className='flex gap-[3px]'>
//                                     {weeks.map((week, wIndex) => (
//                                         <div key={wIndex} className='flex flex-col gap-[3px]'>
//                                             {week.map((day, dIndex) => (
//                                                 <div
//                                                     key={day.date || dIndex}
//                                                     title={`${day.count} contribution${day.count === 1 ? "" : "s"
//                                                         } on ${day.date}`}
//                                                     className='w-3 h-3 rounded-[2px] transition-colors duration-150 hover:ring-1 hover:ring-white/60'
//                                                     style={{
//                                                         backgroundColor: LEVEL_COLORS[day.level] || LEVEL_COLORS[0],
//                                                     }}
//                                                 />
//                                             ))}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Footer: total + legend */}
//                             <div className='flex flex-wrap items-center justify-between mt-5 gap-3'>
//                                 <p className='text-secondary text-sm'>
//                                     {total} contributions
//                                     {year ? ` in ${year}` : ""} on{" "}
//                                     <a
//                                         href={`https://github.com/${username}`}
//                                         target='_blank'
//                                         rel='noreferrer'
//                                         className='text-white underline underline-offset-2'
//                                     >
//                                         GitHub
//                                     </a>
//                                 {privateReposNote ? ` and ${privateReposNote}` : ""}
//                             </p>

//                             <div className='flex items-center gap-1 text-secondary text-sm'>
//                                 <span>Less</span>
//                                 {LEVEL_COLORS.map((color, i) => (
//                                     <div
//                                         key={i}
//                                         className='w-3 h-3 rounded-[2px]'
//                                         style={{ backgroundColor: color }}
//                                     />
//                                 ))}
//                                 <span>More</span>
//                             </div>
//                         </div>
//                 </>
//           )}
//             </div>
//         </div>
//     </motion.div >
//   );
// };

// export default SectionWrapper(GithubActivity, "github");

//TODO manual with screen shot and the above is through api call dynamic but will only show the public repos activity

import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

// Drop your screenshot at: src/assets/github-contributions.png
import githubContributions from "../assets/githubActivityStatus.png";

const GithubActivity = () => {
  return (
    <motion.div variants={textVariant()}>
      <p className={`${styles.sectionSubText} text-center`}>My Consistency</p>
      <h2 className={`${styles.sectionHeadText} text-center`}>
        Github Activity.
      </h2>

      <div className="mt-10 w-full overflow-x-auto">
        <div className="min-w-[750px] bg-[#0d1117] border border-white/10 rounded-2xl p-4">
          <img
            src={githubContributions}
            alt="GitHub contribution activity graph"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SectionWrapper(GithubActivity, "github");