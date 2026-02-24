/** Training programme data — exercises with YouTube tutorial embeds & Unsplash images */

export interface Exercise {
  id: string;
  name: string;
  emoji: string;
  sets: number;
  reps: string;          // e.g. "12" | "10-12" | "45 sec"
  rest: string;          // e.g. "60s" | "90s"
  muscles: string[];
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;         // Unsplash URL
  videoId: string;       // YouTube video ID
  tip: string;
}

export interface WorkoutDay {
  day: string;           // "Monday" etc.
  type: string;          // "Push Day" etc.
  emoji: string;
  color: string;
  gradient: string;
  duration: number;      // minutes
  calories: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  muscles: string[];
  overviewVideoId: string;
  exercises: Exercise[];
}

export interface TrainingPlan {
  name: string;
  days: WorkoutDay[];
}

/* ─── Shared exercise library ──────────────────────────────────────────────── */
const EX: Record<string, Exercise> = {
  // PUSH
  benchPress: {
    id: 'bench', name: 'Barbell Bench Press', emoji: '🏋️',
    sets: 4, reps: '8-10', rest: '90s',
    muscles: ['Chest', 'Triceps', 'Shoulders'], equipment: 'Barbell + Bench',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    videoId: 'SCVCLChPQFY',
    tip: 'Keep shoulder blades pinched together and feet flat on the floor throughout.',
  },
  inclineDumbbell: {
    id: 'incline', name: 'Incline Dumbbell Press', emoji: '💪',
    sets: 3, reps: '10-12', rest: '75s',
    muscles: ['Upper Chest', 'Shoulders'], equipment: 'Dumbbells + Bench',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    videoId: 'DbFgADa2PL8',
    tip: 'Set the bench at 30-45° — going steeper shifts too much load onto delts.',
  },
  cableFly: {
    id: 'cabfly', name: 'Cable Chest Fly', emoji: '✈️',
    sets: 3, reps: '12-15', rest: '60s',
    muscles: ['Chest'], equipment: 'Cable Machine',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1585152968992-d2b9444408cc?w=600&q=80',
    videoId: '_RlRDWO2jfg',
    tip: 'Focus on squeezing at the peak; this is a stretch & contraction exercise.',
  },
  tricepDips: {
    id: 'tdips', name: 'Tricep Dips', emoji: '⬇️',
    sets: 3, reps: '10-15', rest: '60s',
    muscles: ['Triceps', 'Lower Chest'], equipment: 'Parallel Bars',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80',
    videoId: '2z8JmcrW-As',
    tip: 'Lean slightly forward to engage chest; stay upright for pure tricep focus.',
  },
  overheadPress: {
    id: 'ohp', name: 'Overhead Press', emoji: '🙌',
    sets: 4, reps: '8-10', rest: '90s',
    muscles: ['Shoulders', 'Triceps', 'Upper Traps'], equipment: 'Barbell',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1583456431153-a730b9e9b720?w=600&q=80',
    videoId: 'IVSgFkYTp50',
    tip: 'Brace your core, push the bar in a straight line, tuck chin as bar passes.',
  },
  lateralRaise: {
    id: 'latrise', name: 'Lateral Raises', emoji: '🦅',
    sets: 3, reps: '15-20', rest: '45s',
    muscles: ['Side Delts'], equipment: 'Dumbbells',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&q=80',
    videoId: 'kDqklk1ZESo',
    tip: 'Use lighter weight with slight bend in elbow; lead with the elbow not the wrist.',
  },
  pushUps: {
    id: 'pushups', name: 'Push-Ups', emoji: '🔽',
    sets: 3, reps: '15-20', rest: '60s',
    muscles: ['Chest', 'Triceps', 'Core'], equipment: 'Bodyweight',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=600&q=80',
    videoId: 'IODxDxX7oi4',
    tip: 'Keep your body in a straight plank line; don\'t let your hips sag.',
  },
  // PULL
  deadlift: {
    id: 'dead', name: 'Romanian Deadlift', emoji: '🏗️',
    sets: 4, reps: '8-10', rest: '120s',
    muscles: ['Hamstrings', 'Glutes', 'Lower Back'], equipment: 'Barbell',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
    videoId: 'ytGaGIn3SjE',
    tip: 'Keep the bar close to your body, hinge at the hips, maintain neutral spine.',
  },
  pullUps: {
    id: 'pulls', name: 'Pull-Ups', emoji: '⬆️',
    sets: 4, reps: '6-10', rest: '90s',
    muscles: ['Lats', 'Biceps', 'Rear Delts'], equipment: 'Pull-Up Bar',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80',
    videoId: 'eGo4IYlbE5g',
    tip: 'Start from a dead hang, pull to chin above bar, control the descent.',
  },
  cableRow: {
    id: 'crow', name: 'Seated Cable Row', emoji: '🚣',
    sets: 3, reps: '10-12', rest: '75s',
    muscles: ['Mid Back', 'Biceps', 'Rear Delts'], equipment: 'Cable Machine',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=600&q=80',
    videoId: 'GZbfZ033f74',
    tip: 'Pull the handle to your lower sternum, keep elbows tight to body.',
  },
  facePull: {
    id: 'fpull', name: 'Face Pulls', emoji: '😤',
    sets: 3, reps: '15-20', rest: '45s',
    muscles: ['Rear Delts', 'Rotator Cuff'], equipment: 'Cable Machine',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=600&q=80',
    videoId: 'HSoHeSjvIdY',
    tip: 'Pull to face level, flare elbows out to 90°, squeeze rear delts at peak.',
  },
  bicepCurls: {
    id: 'bcurls', name: 'Barbell Bicep Curls', emoji: '💪',
    sets: 3, reps: '10-12', rest: '60s',
    muscles: ['Biceps'], equipment: 'Barbell',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=600&q=80',
    videoId: 'ykJmrZ5v0Oo',
    tip: 'Keep elbows pinned at sides; don\'t swing the body to generate momentum.',
  },
  hammerCurls: {
    id: 'hcurls', name: 'Hammer Curls', emoji: '🔨',
    sets: 3, reps: '12-15', rest: '60s',
    muscles: ['Brachialis', 'Biceps', 'Forearms'], equipment: 'Dumbbells',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80',
    videoId: 'TwD-YGVP4Bk',
    tip: 'Neutral (thumb-up) grip; great for building peak and forearm thickness.',
  },
  latPulldown: {
    id: 'lpd', name: 'Lat Pulldown', emoji: '⬇️',
    sets: 3, reps: '10-12', rest: '75s',
    muscles: ['Lats', 'Biceps'], equipment: 'Cable Machine',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&q=80',
    videoId: 'CAwf7n6Luuc',
    tip: 'Pull bar to upper chest, lean back 15°, avoid shrugging the shoulders.',
  },
  // LEGS
  squat: {
    id: 'squat', name: 'Barbell Back Squat', emoji: '🦵',
    sets: 4, reps: '8-10', rest: '120s',
    muscles: ['Quads', 'Glutes', 'Hamstrings', 'Core'], equipment: 'Barbell + Rack',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80',
    videoId: 'ultWZbUMPL8',
    tip: 'Chest up, knees track over toes, break parallel for full quad activation.',
  },
  legPress: {
    id: 'legps', name: 'Leg Press', emoji: '🤸',
    sets: 3, reps: '12-15', rest: '75s',
    muscles: ['Quads', 'Glutes'], equipment: 'Leg Press Machine',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80',
    videoId: 'IZxyjW7MPJQ',
    tip: 'Don\'t lock out knees at top; keep tension throughout the movement.',
  },
  bulgarianSplit: {
    id: 'bsqs', name: 'Bulgarian Split Squat', emoji: '🧗',
    sets: 3, reps: '10 each leg', rest: '90s',
    muscles: ['Quads', 'Glutes', 'Hips'], equipment: 'Dumbbells + Bench',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    videoId: 'hs34HbFMbvI',
    tip: 'Keep front foot far enough forward so your shin stays vertical at bottom.',
  },
  legCurl: {
    id: 'lcurl', name: 'Lying Leg Curl', emoji: '🦿',
    sets: 3, reps: '12-15', rest: '60s',
    muscles: ['Hamstrings'], equipment: 'Leg Curl Machine',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=600&q=80',
    videoId: '1Tq3QdYUuHs',
    tip: 'Control the eccentric (lowering) phase — hamstrings grow under that tension.',
  },
  calfRaise: {
    id: 'calf', name: 'Standing Calf Raises', emoji: '🦶',
    sets: 4, reps: '15-20', rest: '45s',
    muscles: ['Calves'], equipment: 'Calf Raise Machine or Step',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80',
    videoId: 'gwLzBJYoWlI',
    tip: 'Full range of motion — go all the way up and stretch deep at the bottom.',
  },
  hipThrust: {
    id: 'hthrust', name: 'Barbell Hip Thrust', emoji: '🍑',
    sets: 3, reps: '12-15', rest: '75s',
    muscles: ['Glutes', 'Hamstrings'], equipment: 'Barbell + Bench',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&q=80',
    videoId: 'LM8XHLYJoYs',
    tip: 'Drive through heels, squeeze glutes hard at the top for 1-2 seconds.',
  },
  // CORE
  plank: {
    id: 'plank', name: 'Plank', emoji: '🪵',
    sets: 3, reps: '45-60 sec', rest: '45s',
    muscles: ['Core', 'Shoulders'], equipment: 'Bodyweight',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1593164842264-854604db2260?w=600&q=80',
    videoId: 'ASdvN_XEl_c',
    tip: 'Keep neutral spine — imagine a straight line from head to heels.',
  },
  crunches: {
    id: 'crunch', name: 'Weighted Crunches', emoji: '🌀',
    sets: 3, reps: '15-20', rest: '45s',
    muscles: ['Rectus Abdominis'], equipment: 'Weight Plate',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
    videoId: 'Xyd_fa5zoEU',
    tip: 'Focus on curling the ribcage toward pelvis — short but intense contraction.',
  },
  hangingKneeRaise: {
    id: 'hkr', name: 'Hanging Knee Raise', emoji: '🏗️',
    sets: 3, reps: '12-15', rest: '60s',
    muscles: ['Lower Abs', 'Hip Flexors'], equipment: 'Pull-Up Bar',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80',
    videoId: 'hdng3Nm1x_E',
    tip: 'Tilt your pelvis back at the top; don\'t just swing the legs.',
  },
  cableCrunch: {
    id: 'ccrunch', name: 'Cable Crunch', emoji: '🔗',
    sets: 3, reps: '15-20', rest: '45s',
    muscles: ['Rectus Abdominis'], equipment: 'Cable Machine',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1593164842264-854604db2260?w=600&q=80',
    videoId: 'AV5PnFdDPbg',
    tip: 'Round through the lower back at the bottom; this is spinal flexion not a pull.',
  },
  russianTwist: {
    id: 'rtwist', name: 'Russian Twists', emoji: '🔄',
    sets: 3, reps: '20 total', rest: '45s',
    muscles: ['Obliques', 'Core'], equipment: 'Weight Plate or Dumbbell',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=600&q=80',
    videoId: 'wkD8rjkodUI',
    tip: 'Keep feet elevated for added difficulty; twist from the torso, not the arms.',
  },
  abWheel: {
    id: 'abwh', name: 'Ab Wheel Rollout', emoji: '⚙️',
    sets: 3, reps: '8-12', rest: '60s',
    muscles: ['Core', 'Lats', 'Shoulders'], equipment: 'Ab Wheel',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1593164842264-854604db2260?w=600&q=80',
    videoId: 'n6mZBPbUTjI',
    tip: 'Start from knees if needed — engage abs hard to protect lower back.',
  },
  // CARDIO / ENDURANCE
  treadmill: {
    id: 'tmill', name: 'Treadmill HIIT', emoji: '🏃',
    sets: 6, reps: '30s sprint / 90s walk', rest: '—',
    muscles: ['Full Body', 'Cardio'], equipment: 'Treadmill',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80',
    videoId: '0Rniqn_hHls',
    tip: 'Sprint at 85-90% max heart rate; walk recoveries bring HR back down below 65%.',
  },
  jumpRope: {
    id: 'jrope', name: 'Jump Rope', emoji: '🪢',
    sets: 5, reps: '2 min', rest: '60s',
    muscles: ['Calves', 'Shoulders', 'Cardio'], equipment: 'Jump Rope',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80',
    videoId: 'FJmRQ5iTXKE',
    tip: 'Land softly on the balls of your feet; keep jumps small and efficient.',
  },
  rowing: {
    id: 'ergo', name: 'Rowing Machine', emoji: '🚣',
    sets: 1, reps: '20 min steady state', rest: '—',
    muscles: ['Back', 'Legs', 'Core', 'Cardio'], equipment: 'Rowing Ergometer',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=600&q=80',
    videoId: 'H0r_NB7CF3Q',
    tip: 'Drive with legs first (60%), then lean back (20%), then pull arms (20%).',
  },
  cycling: {
    id: 'cycle', name: 'Stationary Bike', emoji: '🚴',
    sets: 1, reps: '30 min moderate', rest: '—',
    muscles: ['Quads', 'Glutes', 'Cardio'], equipment: 'Stationary Bike',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80',
    videoId: 'LKgMFGHBPkM',
    tip: 'Maintain cadence 80-90 rpm; adjust resistance so you can still hold a conversation.',
  },
  burpees: {
    id: 'burp', name: 'Burpees', emoji: '🌊',
    sets: 4, reps: '10-12', rest: '60s',
    muscles: ['Full Body', 'Cardio'], equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80',
    videoId: 'TU8QYVW0gDU',
    tip: 'Keep the core braced throughout; jump as high as you can at the top.',
  },
  mountainClimbers: {
    id: 'mclimb', name: 'Mountain Climbers', emoji: '🧗',
    sets: 3, reps: '40 sec', rest: '20s',
    muscles: ['Core', 'Shoulders', 'Cardio'], equipment: 'Bodyweight',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
    videoId: 'nmwgirgXLYM',
    tip: 'Keep hips level and drive knees to chest as fast as you can maintain form.',
  },
  // FLEXIBILITY / YOGA
  sunSalutation: {
    id: 'sunsalt', name: 'Sun Salutation Flow', emoji: '🌅',
    sets: 3, reps: '5 rounds', rest: '30s',
    muscles: ['Full Body', 'Flexibility'], equipment: 'Yoga Mat',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    videoId: 'gFkC5HLTlPA',
    tip: 'Match breath to movement — inhale to expand, exhale to fold or lower.',
  },
  hipFlexorStretch: {
    id: 'hipfl', name: 'Hip Flexor Lunge Stretch', emoji: '🧎',
    sets: 2, reps: '45 sec each side', rest: '15s',
    muscles: ['Hip Flexors', 'Quads'], equipment: 'Yoga Mat',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    videoId: 'YQmpO9VT2X4',
    tip: 'Tuck your pelvis under — don\'t hyperextend the lower back.',
  },
  worldsGreatestStretch: {
    id: 'wgs', name: 'World\'s Greatest Stretch', emoji: '🌍',
    sets: 2, reps: '5 each side', rest: '30s',
    muscles: ['Hips', 'Thoracic Spine', 'Hamstrings'], equipment: 'Bodyweight',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    videoId: 'Hw3kyzmUMjg',
    tip: 'Move slowly through each position, breathing into the stretch.',
  },
  foamRolling: {
    id: 'foam', name: 'Foam Rolling Recovery', emoji: '🔧',
    sets: 1, reps: '10 min full body', rest: '—',
    muscles: ['Recovery', 'Fascia Release'], equipment: 'Foam Roller',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1593164842264-854604db2260?w=600&q=80',
    videoId: 'qlSQ19F4nmg',
    tip: 'Roll slowly, pause on tender spots for 20-30 seconds until they release.',
  },
  pigeon: {
    id: 'pigeon', name: 'Pigeon Pose (Glutes)', emoji: '🕊️',
    sets: 2, reps: '60 sec each side', rest: '15s',
    muscles: ['Glutes', 'Hip External Rotators'], equipment: 'Yoga Mat',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    videoId: 'm7AFEUB0YcU',
    tip: 'Square your hips to the mat; use a folded blanket if hips don\'t reach the ground.',
  },
  thoracicRotation: {
    id: 'thor', name: 'Thoracic Rotation Drill', emoji: '🌀',
    sets: 2, reps: '10 each side', rest: '30s',
    muscles: ['Upper Back', 'Core'], equipment: 'Bodyweight',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=600&q=80',
    videoId: 'gHoFvnhHhlI',
    tip: 'Keep your lower back still — all rotation comes from the chest/upper back.',
  },
};

/* ─── Build a rest day ─────────────────────────────────────────────────────── */
const restDay: WorkoutDay = {
  day: 'Sunday',
  type: 'Active Recovery',
  emoji: '😴',
  color: '#64748b',
  gradient: 'linear-gradient(135deg,#334155,#64748b)',
  duration: 30,
  calories: 100,
  difficulty: 'Beginner',
  muscles: ['Full Body Recovery'],
  overviewVideoId: 'qlSQ19F4nmg',
  exercises: [EX.foamRolling, EX.hipFlexorStretch, EX.worldsGreatestStretch, EX.pigeon, EX.thoracicRotation],
};

/* ─── MUSCLE GAIN programme ─────────────────────────────────────────────────── */
const muscleGainDays: WorkoutDay[] = [
  {
    day: 'Monday', type: 'Push Day', emoji: '💥', color: '#3b82f6',
    gradient: 'linear-gradient(135deg,#1d4ed8,#3b82f6)',
    duration: 65, calories: 420, difficulty: 'Intermediate',
    muscles: ['Chest', 'Shoulders', 'Triceps'],
    overviewVideoId: 'dU4jCExV-bQ',
    exercises: [EX.benchPress, EX.overheadPress, EX.inclineDumbbell, EX.lateralRaise, EX.tricepDips, EX.cableFly],
  },
  {
    day: 'Tuesday', type: 'Pull Day', emoji: '🔗', color: '#22c55e',
    gradient: 'linear-gradient(135deg,#16a34a,#22c55e)',
    duration: 65, calories: 400, difficulty: 'Intermediate',
    muscles: ['Back', 'Biceps', 'Rear Delts'],
    overviewVideoId: 'eHKQOKD03hs',
    exercises: [EX.deadlift, EX.pullUps, EX.cableRow, EX.latPulldown, EX.bicepCurls, EX.facePull],
  },
  {
    day: 'Wednesday', type: 'Leg Day', emoji: '🦵', color: '#f97316',
    gradient: 'linear-gradient(135deg,#ea580c,#f97316)',
    duration: 70, calories: 510, difficulty: 'Intermediate',
    muscles: ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
    overviewVideoId: '9xSANOnYAeA',
    exercises: [EX.squat, EX.legPress, EX.bulgarianSplit, EX.legCurl, EX.hipThrust, EX.calfRaise],
  },
  {
    day: 'Thursday', type: 'Push Day', emoji: '💥', color: '#3b82f6',
    gradient: 'linear-gradient(135deg,#1d4ed8,#3b82f6)',
    duration: 60, calories: 390, difficulty: 'Intermediate',
    muscles: ['Shoulders', 'Chest', 'Triceps'],
    overviewVideoId: 'IVSgFkYTp50',
    exercises: [EX.overheadPress, EX.inclineDumbbell, EX.lateralRaise, EX.cableFly, EX.tricepDips, EX.pushUps],
  },
  {
    day: 'Friday', type: 'Pull Day', emoji: '🔗', color: '#22c55e',
    gradient: 'linear-gradient(135deg,#16a34a,#22c55e)',
    duration: 60, calories: 380, difficulty: 'Intermediate',
    muscles: ['Back', 'Biceps'],
    overviewVideoId: 'IT94xC35u6k',
    exercises: [EX.pullUps, EX.cableRow, EX.latPulldown, EX.bicepCurls, EX.hammerCurls, EX.facePull],
  },
  {
    day: 'Saturday', type: 'Core & Abs', emoji: '🌀', color: '#a855f7',
    gradient: 'linear-gradient(135deg,#7c3aed,#a855f7)',
    duration: 40, calories: 250, difficulty: 'Intermediate',
    muscles: ['Core', 'Abs', 'Obliques'],
    overviewVideoId: 'DHD1-2P4nQk',
    exercises: [EX.plank, EX.crunches, EX.hangingKneeRaise, EX.cableCrunch, EX.russianTwist, EX.abWheel],
  },
  { ...restDay, day: 'Sunday' },
];

/* ─── FAT LOSS programme ─────────────────────────────────────────────────────── */
const fatLossDays: WorkoutDay[] = [
  {
    day: 'Monday', type: 'HIIT Cardio', emoji: '🔥', color: '#ef4444',
    gradient: 'linear-gradient(135deg,#dc2626,#ef4444)',
    duration: 40, calories: 450, difficulty: 'Intermediate',
    muscles: ['Full Body', 'Cardio'],
    overviewVideoId: '0Rniqn_hHls',
    exercises: [EX.burpees, EX.mountainClimbers, EX.jumpRope, EX.treadmill],
  },
  {
    day: 'Tuesday', type: 'Upper Body Strength', emoji: '💪', color: '#3b82f6',
    gradient: 'linear-gradient(135deg,#1d4ed8,#3b82f6)',
    duration: 50, calories: 360, difficulty: 'Intermediate',
    muscles: ['Chest', 'Back', 'Shoulders'],
    overviewVideoId: 'IT94xC35u6k',
    exercises: [EX.pushUps, EX.pullUps, EX.overheadPress, EX.cableRow, EX.lateralRaise, EX.facePull],
  },
  {
    day: 'Wednesday', type: 'Steady State Cardio', emoji: '🚴', color: '#06b6d4',
    gradient: 'linear-gradient(135deg,#0891b2,#06b6d4)',
    duration: 45, calories: 380, difficulty: 'Beginner',
    muscles: ['Cardio', 'Legs'],
    overviewVideoId: 'LKgMFGHBPkM',
    exercises: [EX.cycling, EX.rowing],
  },
  {
    day: 'Thursday', type: 'Lower Body + Core', emoji: '🦵', color: '#f97316',
    gradient: 'linear-gradient(135deg,#ea580c,#f97316)',
    duration: 55, calories: 430, difficulty: 'Intermediate',
    muscles: ['Quads', 'Glutes', 'Core'],
    overviewVideoId: '9xSANOnYAeA',
    exercises: [EX.squat, EX.bulgarianSplit, EX.hipThrust, EX.plank, EX.russianTwist, EX.mountainClimbers],
  },
  {
    day: 'Friday', type: 'HIIT + Abs', emoji: '⚡', color: '#f59e0b',
    gradient: 'linear-gradient(135deg,#d97706,#f59e0b)',
    duration: 40, calories: 420, difficulty: 'Intermediate',
    muscles: ['Full Body', 'Core'],
    overviewVideoId: 'ml6cT4AZdqI',
    exercises: [EX.burpees, EX.jumpRope, EX.crunches, EX.hangingKneeRaise, EX.abWheel, EX.plank],
  },
  {
    day: 'Saturday', type: 'Long Run / Cardio', emoji: '🏃', color: '#22c55e',
    gradient: 'linear-gradient(135deg,#16a34a,#22c55e)',
    duration: 50, calories: 500, difficulty: 'Intermediate',
    muscles: ['Cardio', 'Endurance'],
    overviewVideoId: '0Rniqn_hHls',
    exercises: [EX.treadmill, EX.jumpRope, EX.mountainClimbers],
  },
  { ...restDay, day: 'Sunday' },
];

/* ─── ENDURANCE programme ────────────────────────────────────────────────────── */
const enduranceDays: WorkoutDay[] = [
  {
    day: 'Monday', type: 'Interval Run', emoji: '🏃', color: '#f59e0b',
    gradient: 'linear-gradient(135deg,#d97706,#f59e0b)',
    duration: 50, calories: 520, difficulty: 'Intermediate',
    muscles: ['Cardio', 'Legs'],
    overviewVideoId: '0Rniqn_hHls',
    exercises: [EX.treadmill, EX.mountainClimbers, EX.calfRaise],
  },
  {
    day: 'Tuesday', type: 'Strength & Power', emoji: '⚡', color: '#3b82f6',
    gradient: 'linear-gradient(135deg,#1d4ed8,#3b82f6)',
    duration: 55, calories: 390, difficulty: 'Intermediate',
    muscles: ['Legs', 'Back', 'Core'],
    overviewVideoId: '9xSANOnYAeA',
    exercises: [EX.squat, EX.deadlift, EX.pullUps, EX.plank, EX.crunches],
  },
  {
    day: 'Wednesday', type: 'Cycling / Rowing', emoji: '🚴', color: '#06b6d4',
    gradient: 'linear-gradient(135deg,#0891b2,#06b6d4)',
    duration: 60, calories: 500, difficulty: 'Intermediate',
    muscles: ['Cardio', 'Full Body'],
    overviewVideoId: 'H0r_NB7CF3Q',
    exercises: [EX.rowing, EX.cycling, EX.jumpRope],
  },
  {
    day: 'Thursday', type: 'Tempo Run', emoji: '🏅', color: '#f97316',
    gradient: 'linear-gradient(135deg,#ea580c,#f97316)',
    duration: 45, calories: 480, difficulty: 'Advanced',
    muscles: ['Cardio', 'Mental Toughness'],
    overviewVideoId: 'FJmRQ5iTXKE',
    exercises: [EX.treadmill, EX.burpees, EX.mountainClimbers],
  },
  {
    day: 'Friday', type: 'Upper Body Conditioning', emoji: '💪', color: '#22c55e',
    gradient: 'linear-gradient(135deg,#16a34a,#22c55e)',
    duration: 50, calories: 370, difficulty: 'Intermediate',
    muscles: ['Upper Body', 'Core'],
    overviewVideoId: 'dU4jCExV-bQ',
    exercises: [EX.pushUps, EX.pullUps, EX.cableRow, EX.overheadPress, EX.plank],
  },
  {
    day: 'Saturday', type: 'Long Endurance', emoji: '🌄', color: '#a855f7',
    gradient: 'linear-gradient(135deg,#7c3aed,#a855f7)',
    duration: 75, calories: 650, difficulty: 'Advanced',
    muscles: ['Cardio', 'Full Body'],
    overviewVideoId: 'FJmRQ5iTXKE',
    exercises: [EX.cycling, EX.rowing, EX.jumpRope, EX.burpees],
  },
  { ...restDay, day: 'Sunday' },
];

/* ─── FLEXIBILITY programme ─────────────────────────────────────────────────── */
const flexibilityDays: WorkoutDay[] = [
  {
    day: 'Monday', type: 'Full Body Yoga Flow', emoji: '🧘', color: '#a855f7',
    gradient: 'linear-gradient(135deg,#7c3aed,#a855f7)',
    duration: 45, calories: 160, difficulty: 'Beginner',
    muscles: ['Full Body', 'Flexibility'],
    overviewVideoId: 'gFkC5HLTlPA',
    exercises: [EX.sunSalutation, EX.hipFlexorStretch, EX.pigeon, EX.worldsGreatestStretch, EX.thoracicRotation, EX.foamRolling],
  },
  {
    day: 'Tuesday', type: 'Strength + Mobility', emoji: '⚖️', color: '#22c55e',
    gradient: 'linear-gradient(135deg,#16a34a,#22c55e)',
    duration: 50, calories: 280, difficulty: 'Intermediate',
    muscles: ['Full Body', 'Core'],
    overviewVideoId: 'gFkC5HLTlPA',
    exercises: [EX.squat, EX.pushUps, EX.cableRow, EX.plank, EX.worldsGreatestStretch],
  },
  {
    day: 'Wednesday', type: 'Hip & Lower Body', emoji: '🦋', color: '#f97316',
    gradient: 'linear-gradient(135deg,#ea580c,#f97316)',
    duration: 40, calories: 130, difficulty: 'Beginner',
    muscles: ['Hips', 'Hamstrings', 'Glutes'],
    overviewVideoId: 'YQmpO9VT2X4',
    exercises: [EX.hipFlexorStretch, EX.pigeon, EX.bulgarianSplit, EX.legCurl, EX.foamRolling],
  },
  {
    day: 'Thursday', type: 'Core & Breath Work', emoji: '🌬️', color: '#06b6d4',
    gradient: 'linear-gradient(135deg,#0891b2,#06b6d4)',
    duration: 35, calories: 120, difficulty: 'Beginner',
    muscles: ['Core', 'Breathing'],
    overviewVideoId: 'ASdvN_XEl_c',
    exercises: [EX.plank, EX.crunches, EX.russianTwist, EX.thoracicRotation, EX.foamRolling],
  },
  {
    day: 'Friday', type: 'Upper Body Flow', emoji: '🦢', color: '#3b82f6',
    gradient: 'linear-gradient(135deg,#1d4ed8,#3b82f6)',
    duration: 40, calories: 150, difficulty: 'Beginner',
    muscles: ['Shoulders', 'Thoracic', 'Chest'],
    overviewVideoId: 'gHoFvnhHhlI',
    exercises: [EX.sunSalutation, EX.thoracicRotation, EX.worldsGreatestStretch, EX.pushUps, EX.foamRolling],
  },
  {
    day: 'Saturday', type: 'Deep Stretch & Restore', emoji: '🌙', color: '#8b5cf6',
    gradient: 'linear-gradient(135deg,#6d28d9,#8b5cf6)',
    duration: 50, calories: 100, difficulty: 'Beginner',
    muscles: ['Full Body Recovery'],
    overviewVideoId: 'qlSQ19F4nmg',
    exercises: [EX.foamRolling, EX.pigeon, EX.hipFlexorStretch, EX.worldsGreatestStretch, EX.sunSalutation, EX.thoracicRotation],
  },
  { ...restDay, day: 'Sunday' },
];

/* ─── GENERAL programme ──────────────────────────────────────────────────────── */
const generalDays: WorkoutDay[] = [
  {
    day: 'Monday', type: 'Full Body Strength', emoji: '💪', color: '#22c55e',
    gradient: 'linear-gradient(135deg,#16a34a,#22c55e)',
    duration: 55, calories: 360, difficulty: 'Beginner',
    muscles: ['Full Body'],
    overviewVideoId: '0Rniqn_hHls',
    exercises: [EX.squat, EX.pushUps, EX.cableRow, EX.overheadPress, EX.plank],
  },
  {
    day: 'Tuesday', type: 'Cardio', emoji: '🏃', color: '#f97316',
    gradient: 'linear-gradient(135deg,#ea580c,#f97316)',
    duration: 35, calories: 320, difficulty: 'Beginner',
    muscles: ['Cardio'],
    overviewVideoId: 'FJmRQ5iTXKE',
    exercises: [EX.jumpRope, EX.mountainClimbers, EX.burpees, EX.cycling],
  },
  {
    day: 'Wednesday', type: 'Upper Body', emoji: '💥', color: '#3b82f6',
    gradient: 'linear-gradient(135deg,#1d4ed8,#3b82f6)',
    duration: 50, calories: 330, difficulty: 'Beginner',
    muscles: ['Chest', 'Back', 'Arms'],
    overviewVideoId: 'dU4jCExV-bQ',
    exercises: [EX.benchPress, EX.pullUps, EX.lateralRaise, EX.bicepCurls, EX.tricepDips],
  },
  {
    day: 'Thursday', type: 'Active Recovery', emoji: '🧘', color: '#a855f7',
    gradient: 'linear-gradient(135deg,#7c3aed,#a855f7)',
    duration: 30, calories: 100, difficulty: 'Beginner',
    muscles: ['Recovery'],
    overviewVideoId: 'gFkC5HLTlPA',
    exercises: [EX.foamRolling, EX.hipFlexorStretch, EX.worldsGreatestStretch, EX.pigeon],
  },
  {
    day: 'Friday', type: 'Lower Body', emoji: '🦵', color: '#f59e0b',
    gradient: 'linear-gradient(135deg,#d97706,#f59e0b)',
    duration: 55, calories: 410, difficulty: 'Intermediate',
    muscles: ['Legs', 'Glutes'],
    overviewVideoId: '9xSANOnYAeA',
    exercises: [EX.squat, EX.legPress, EX.hipThrust, EX.legCurl, EX.calfRaise],
  },
  {
    day: 'Saturday', type: 'Core & Cardio Mix', emoji: '⚡', color: '#06b6d4',
    gradient: 'linear-gradient(135deg,#0891b2,#06b6d4)',
    duration: 40, calories: 350, difficulty: 'Beginner',
    muscles: ['Core', 'Cardio'],
    overviewVideoId: 'DHD1-2P4nQk',
    exercises: [EX.plank, EX.crunches, EX.russianTwist, EX.burpees, EX.jumpRope],
  },
  { ...restDay, day: 'Sunday' },
];

/* ─── Export map keyed by goal ───────────────────────────────────────────────── */
const TRAINING_PLANS: Record<string, TrainingPlan> = {
  muscle_gain: { name: 'Push · Pull · Legs', days: muscleGainDays },
  weight_loss:  { name: 'Fat Loss HIIT',      days: fatLossDays },
  endurance:    { name: 'Endurance Builder',  days: enduranceDays },
  flexibility:  { name: 'Mobility & Yoga',    days: flexibilityDays },
  general:      { name: 'General Fitness',    days: generalDays },
};

export function getTrainingPlan(goal: string): TrainingPlan {
  return TRAINING_PLANS[goal] ?? TRAINING_PLANS['general'];
}
