import json

# file_path = "./json_format.json"

# with open(file_path, 'r') as file:
#     data = json.load(file)
#  ci/continuous integration/developer experience
high_lead_terms = ["ci", "CI/CD", "cicd", "continuous integration",
                   "devex", "dev/ex", "developer experience"]

medium_lead_terms = ["devops", "infrastructure", "SRE", "Site Reliability Engineer",
                     "quality engineer", "QA", "release", "platform"]

gotcha_terms = ["sales engineer", "solutions engineer"]


def getMostRecentExperience(data):
    experiences = data.get('experiences', [])
    current_experiences = [
        exp for exp in experiences if exp.get('ends_at') is None]
    print(current_experiences)
    # if len(current_experiences == 0):
    #     findEarliest(experiences)
    return current_experiences


def findEarliest(date):
    return True


def getHighLeadCount(experiences):
    pass
