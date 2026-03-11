// Logical large Truth or Dare dataset.
// Produces exactly 1000 truth entries and 1000 dare entries across 102 categories.

const difficulties = ["easy", "medium", "hard", "savage", "evil"];

const tagPool = [
  "funny",
  "embarrassing",
  "awkward",
  "confession",
  "crush",
  "social",
  "prank",
  "challenge",
  "performance",
  "psychological",
  "party",
  "group",
  "risky",
  "friendship",
];

const seeds = [
  "embarrassing_secrets",
  "crush_confessions",
  "awkward_moments",
  "friendship_tests",
  "secret_thoughts",
  "hypothetical_choices",
  "social_media",
  "public_embarrassment",
  "funny_confessions",
  "personal_preferences",
  "past_regrets",
  "random_funny",
  "confidence_challenges",
  "prank_energy",
  "acting_spotlight",
  "performance_mode",
  "weird_behavior",
  "social_challenges",
  "fear_facing",
  "mind_games",
  "guilty_pleasures",
  "childhood_flashbacks",
  "friend_group_drama",
  "petty_truths",
  "habit_reveals",
  "late_night_thoughts",
  "opinion_battles",
  "future_fantasies",
  "first_impressions",
  "double_or_nothing",
  "mystery_box",
  "bold_predictions",
  "tiny_confessions",
  "chaos_corner",
];

const variants = ["after_dark", "rapid_fire", "spotlight"];

const truthTemplates = [
  "What is one {topic} thought you had {timeframe} but never said to this group?",
  "Which {topic} moment still makes you cringe, and why does it stay in your head?",
  "Name one person here you would trust with your biggest {topic} secret tonight.",
  "What is your most dramatic {topic} overreaction from the last year?",
  "If everyone heard your private {topic} monologue, which line would shock them first?",
  "What is one harmless lie linked to {topic} that you told recently?",
  "Which {topic} memory would you delete if you could keep only the lesson?",
  "What is your hidden rule about {topic} that you never admit publicly?",
  "Which friend here has seen your funniest {topic} side, and what happened?",
  "What is one decision about {topic} you still regret, even if it made sense then?",
  "What is your most unexpected {topic} preference that people judge incorrectly?",
  "What truth about {topic} would your younger self find unbelievable today?",
];

const dareTemplates = [
  "Deliver a 20-second dramatic announcement about {topic} like a game show host right now.",
  "Act out your funniest {topic} fail in charades until two players guess correctly.",
  "Create a mini slogan about {topic} and chant it confidently three times.",
  "Do a bold runway walk that represents your {topic} energy for fifteen seconds.",
  "Speak in a movie trailer voice about {topic} for twenty seconds without laughing.",
  "Give a fake award speech for your greatest {topic} achievement, including two thank-yous.",
  "Perform a short commercial selling your {topic} skills to the whole room.",
  "Do a one-minute roleplay as a strict coach teaching {topic} basics.",
  "Improvise a catchy song line about {topic} and repeat it with different emotions.",
  "Pretend to host a news update about {topic} and finish with dramatic headlines.",
  "Mimic your own {topic} panic face, then freeze in that pose for ten seconds.",
  "Pitch a ridiculous but safe challenge about {topic} and perform the first step now.",
];

const timeframes = [
  "this week",
  "during the last party",
  "this month",
  "in your school or college era",
  "on a random late night",
  "before today",
  "this year",
  "while scrolling online recently",
];

const closers = [
  "Be specific but keep names optional.",
  "Keep it honest and short.",
  "No dodging allowed this round.",
  "Make it playful, not mean.",
  "Give one clear example.",
  "Keep it real for the group.",
  "Say it with confidence.",
  "No dramatic pauses this time.",
];

function humanizeCategory(slug) {
  return slug
    .replace(/_/g, " ")
    .replace(/\bafter dark\b/g, "after-dark")
    .replace(/\brapid fire\b/g, "rapid-fire")
    .replace(/\bspotlight\b/g, "spotlight round");
}

function pickDifficulty(seed) {
  return difficulties[seed % difficulties.length];
}

function pickTags(category, idx, type) {
  const tags = new Set();
  const words = category.split("_");

  if (words.includes("crush")) tags.add("crush");
  if (words.includes("friendship") || words.includes("friend"))
    tags.add("friendship");
  if (words.includes("social") || words.includes("public")) tags.add("social");
  if (words.includes("awkward") || words.includes("embarrassing"))
    tags.add("awkward");
  if (
    words.includes("performance") ||
    words.includes("acting") ||
    words.includes("spotlight")
  ) {
    tags.add("performance");
  }
  if (words.includes("mind") || words.includes("thoughts"))
    tags.add("psychological");

  tags.add(type === "truth" ? "confession" : "challenge");
  tags.add("party");

  while (tags.size < 3) {
    tags.add(tagPool[(idx + tags.size * 7) % tagPool.length]);
  }

  if (tags.size < 4 && idx % 3 === 0) {
    tags.add(tagPool[(idx * 5 + 3) % tagPool.length]);
  }

  return Array.from(tags).slice(0, 4);
}

function fitWordCount(text) {
  const words = text.trim().split(/\s+/);
  if (words.length > 25) {
    return words.slice(0, 25).join(" ");
  }
  if (words.length < 10) {
    return `${text} Share one clear detail now.`;
  }
  return text;
}

function buildDataset() {
  const categories = seeds.flatMap((seed) =>
    variants.map((variant) => `${seed}_${variant}`),
  );

  const truthEntries = [];
  const dareEntries = [];
  let truthId = 1;
  let dareId = 1;

  for (let i = 0; i < categories.length; i += 1) {
    const category = categories[i];
    const topic = humanizeCategory(category);

    const totalInCategory = i < 62 ? 20 : 19;
    const truthCount = i < 82 ? 10 : 9;
    const dareCount = totalInCategory - truthCount;

    for (let t = 0; t < truthCount; t += 1) {
      const template = truthTemplates[(i + t) % truthTemplates.length];
      const timeframe = timeframes[(i * 3 + t) % timeframes.length];
      const closer = closers[(i + t * 2) % closers.length];
      const raw = template
        .replace("{topic}", topic)
        .replace("{timeframe}", timeframe);

      truthEntries.push({
        id: `truth_${truthId.toString().padStart(4, "0")}`,
        type: "truth",
        category,
        difficulty: pickDifficulty(i + t),
        tags: pickTags(category, i * 100 + t, "truth"),
        prompt: fitWordCount(`${raw} ${closer}`),
      });
      truthId += 1;
    }

    for (let d = 0; d < dareCount; d += 1) {
      const template = dareTemplates[(i + d * 2) % dareTemplates.length];
      const closer = closers[(i + d) % closers.length];
      const raw = template.replace("{topic}", topic);

      dareEntries.push({
        id: `dare_${dareId.toString().padStart(4, "0")}`,
        type: "dare",
        category,
        difficulty: pickDifficulty(i + d + 2),
        tags: pickTags(category, i * 100 + d, "dare"),
        prompt: fitWordCount(`${raw} ${closer}`),
      });
      dareId += 1;
    }
  }

  if (truthEntries.length !== 1000 || dareEntries.length !== 1000) {
    throw new Error(
      `Dataset count mismatch: truth=${truthEntries.length}, dare=${dareEntries.length}`,
    );
  }

  return {
    categories,
    truthEntries,
    dareEntries,
    allEntries: [...truthEntries, ...dareEntries],
  };
}

const data = buildDataset();

export const categoryList = data.categories;
export const truthEntries = data.truthEntries;
export const dareEntries = data.dareEntries;
export const allEntries = data.allEntries;

export const truthQuestions = truthEntries.map((item) => item.prompt);
export const dareChallenges = dareEntries.map((item) => item.prompt);

export default {
  categoryList,
  truthEntries,
  dareEntries,
  allEntries,
  truthQuestions,
  dareChallenges,
};
