const isValidRole = (profileData, experiences) => {
    const roles = ["director", "staff", "principal", "manager"];
    const occupation = profileData.occupation.toLowerCase();
    const headline = profileData.headline.toLowerCase();

    return roles.some(role => occupation.includes(role) || headline.includes(role));
};

const getMostRecentExperience = (data) => {
    const experiences = data.experiences || [];
    return experiences.filter(exp => exp.ends_at === null);
};

const checkForHighLeads = (experiences) => {

};

const checkForGotchaTerms = (data) => {
    for (const term of gotchaTerms) {
        if (data.occupation.toLowerCase().includes(term)) return false;
        if (data.headline.toLowerCase().includes(term)) return false;
        if (data.summary.toLowerCase().includes(term)) return false;
    }
    // The original function didn't have a return statement if no terms were found
};

const analyzeProfileFit = (profileData) => {
    const highFitKeywords = ["ci", "CI/CD", "cicd", "continuous integration", "devex", "dev/ex", "developer experience"];
    const mediumFitKeywords = ["devops", "infrastructure", "quality engineer", "QA", "release", "platform"];
    const relevantRoles = ["staff engineer", "principal engineer", "senior manager", "manager", "director"];

    const currentRole = profileData.experiences && profileData.experiences[0] ? profileData.experiences[0].title.toLowerCase() : "";

    if (!relevantRoles.some(role => currentRole.includes(role))) {
        return "low fit";
    }

    if (currentRole.includes("sales engineer") || currentRole.includes("solutions engineer")) {
        return "low fit";
    }

    const checkKeywords = (text, keywords) => {
        return keywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()));
    };

    const headline = (profileData.headline || "").toLowerCase();
    const summary = (profileData.summary || "").toLowerCase();
    const currentExperience = profileData.experiences && profileData.experiences[0] && profileData.experiences[0].description ? profileData.experiences[0].description : "";

    if (checkKeywords(headline, highFitKeywords) || 
        checkKeywords(summary, highFitKeywords) || 
        checkKeywords(currentExperience, highFitKeywords)) {
        return "high fit";
    }

    if (checkKeywords(headline, mediumFitKeywords) || 
        checkKeywords(summary, mediumFitKeywords) || 
        checkKeywords(currentExperience, mediumFitKeywords)) {
        return "medium fit";
    }

    for (let i = 1; i < profileData.experiences.length; i++) {
        const experience = profileData.experiences[i];
        if (experience.description && checkKeywords(experience.description, highFitKeywords)) {
            return "medium fit";
        }
    }

    return "low fit";
};

const highLeadTerms = ["ci", "CI/CD", "cicd", "continuous integration", "devex", "dev/ex", "developer experience"];
const mediumLeadTerms = ["devops", "infrastructure", "quality engineer", "QA", "release", "platform"];
const gotchaTerms = ["sales engineer", "solutions engineer"];