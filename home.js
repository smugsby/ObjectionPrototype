// Metal roofing customer archetypes with objections categorized by difficulty
const archetypes = {
    "cost-conscious": {
        name: "Cost-Conscious Homeowner",
        objections: {
            easy: ["Metal roofs are expensive.", "Can’t I repair my current roof?", "Do you offer discounts?"],
            medium: ["Why is this more costly than asphalt shingles?", "Will this save me money long-term?", "Do I really need this upgrade?"],
            hard: ["Other contractors gave me a lower quote.", "Is this worth the upfront investment?", "Why should I trust your pricing?"]
        }
    },
    "quality-focused": {
        name: "Quality-Focused Buyer",
        objections: {
            easy: ["How durable is the roof?", "Is it better than shingles?", "Does it come with a warranty?"],
            medium: ["Will this handle storms and hail?", "How long will it actually last?", "Why is this considered premium?"],
            hard: ["What makes this roof worth the cost?", "Can you prove it lasts 50 years?", "Why should I choose this over other materials?"]
        }
    },
    "researcher": {
        name: "Researcher",
        objections: {
            easy: ["Are metal roofs noisy?", "Do they dent easily?", "How does it compare to shingles?"],
            medium: ["What’s the energy efficiency rating?", "What are the maintenance requirements?", "Is this material environmentally friendly?"],
            hard: ["What happens if there’s a defect?", "Is there scientific proof for these claims?", "Can you provide case studies?"]
        }
    },
    // Add remaining archetypes here...
};

// Helper function to get random objections
function getRandomObjections(objectionList, count) {
    const objections = [];
    while (objections.length < count && objectionList.length > 0) {
        const randomIndex = Math.floor(Math.random() * objectionList.length);
        objections.push(objectionList.splice(randomIndex, 1)[0]);
    }
    return objections;
}

// Form submission event
document.querySelector("#promptForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear old output
    const outputBox = document.querySelector("#outputBox");
    outputBox.value = "";

    const difficulty = document.querySelector("#difficulty").value;
    const selectedCheckboxes = document.querySelectorAll('input[name="archetype"]:checked');
    const transitionType = document.querySelector('input[name="transitionType"]:checked').value;

    // No archetypes selected
    if (selectedCheckboxes.length === 0) {
        console.log("No archetypes selected.");
        outputBox.value = "No archetypes selected.";
        return;
    }

    // Pick a random archetype from the selected ones
    const randomIndex = Math.floor(Math.random() * selectedCheckboxes.length);
    const selectedArchetype = archetypes[selectedCheckboxes[randomIndex].value];
    const objections = JSON.parse(JSON.stringify(selectedArchetype.objections)); // Clone objections

    // Generate objections based on difficulty
    let selectedObjections = [];
    if (difficulty === "easy") {
        selectedObjections = getRandomObjections(objections.easy, 2);
    } else if (difficulty === "medium") {
        selectedObjections = getRandomObjections(objections.easy, 1).concat(
            getRandomObjections(objections.medium, 2)
        );
    } else if (difficulty === "hard") {
        selectedObjections = getRandomObjections(objections.easy, 2).concat(
            getRandomObjections(objections.medium, 2),
            getRandomObjections(objections.hard, 1)
        );
    }

    // Generate output
    let output = `Transition Type: ${transitionType}\n`;
    output += `Archetype: ${selectedArchetype.name}\n`;
    selectedObjections.forEach((objection, idx) => {
        output += `   Objection ${idx + 1}: ${objection}\n`;
    });

    // Display in output box
    outputBox.value = output;

    // Log in console
    console.clear();
    console.log("Prompt Generated:");
    console.log(output);
});
