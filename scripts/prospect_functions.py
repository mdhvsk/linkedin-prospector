def isValidRole(profile_data, experiences):
    roles = ["director", "staff", "principal", "manager"]

    occupation = profile_data["occupation"].lower()
    headline = profile_data["headline"].lower()

    for role in roles:
        if role in occupation or role in headline:
            return True
    return False


def getMostRecentExperience(data):
    experiences = data.get('experiences', [])
    current_experiences = [
        exp for exp in experiences if exp.get('ends_at') is None]
    return current_experiences


def checkForHighLeads(experiences):
    pass

def checkForGotchaTerms(data):

    for term in gotcha_terms:
        if term in data["occupation"].lower(): return False
        if term in data["headline"].lower(): return False
        if term in data["summary"].lower(): return False

    pass

def analyze_profile_fit(profile_data):
    # Keywords for high fit
    high_fit_keywords = ["ci", "CI/CD", "cicd", "continuous integration", "devex", "dev/ex", "developer experience"]
    
    # Keywords for medium fit
    medium_fit_keywords = ["devops", "infrastructure", "quality engineer", "QA", "release", "platform"]
    
    # Check for relevant roles
    relevant_roles = ["staff engineer", "principal engineer", "senior manager", "manager", "director"]
    
    current_role = profile_data['experiences'][0]['title'].lower() if profile_data['experiences'] else ""
    
    if not any(role in current_role for role in relevant_roles):
        return "low fit"
    
    # Check for red flags
    if "sales engineer" in current_role or "solutions engineer" in current_role:
        return "low fit"
    
    # Function to check keywords in a text
    def check_keywords(text, keywords):
        return any(keyword.lower() in text.lower() for keyword in keywords)
    
    # Check high fit keywords in headline, summary, and current role
    headline = profile_data.get('headline', '').lower()
    summary = profile_data.get('summary', '').lower()
    current_experience = profile_data['experiences'][0]['description'] if profile_data['experiences'] and profile_data['experiences'][0]['description'] else ""
    
    if (check_keywords(headline, high_fit_keywords) or 
        check_keywords(summary, high_fit_keywords) or 
        check_keywords(current_experience, high_fit_keywords)):
        return "high fit"
    
    # Check medium fit keywords in current role or high fit keywords in past roles
    if (check_keywords(headline, medium_fit_keywords) or 
        check_keywords(summary, medium_fit_keywords) or 
        check_keywords(current_experience, medium_fit_keywords)):
        return "medium fit"
    
    for experience in profile_data['experiences'][1:]:
        if experience['description'] and check_keywords(experience['description'], high_fit_keywords):
            return "medium fit"
    
    return "low fit"

high_lead_terms = ["ci", "CI/CD", "cicd", "continuous integration",
                   "devex", "dev/ex", "developer experience"]

medium_lead_terms = ["devops", "infrastructure", 
                     "quality engineer", "QA", "release", "platform"]

gotcha_terms = ["sales engineer", "solutions engineer"]
