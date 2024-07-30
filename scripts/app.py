import json
from prospect import getMostRecentExperience
from prospect_functions import analyze_profile_fit, isValidRole
def main():
    file_path = "./sample_high_lead.json"
    with open(file_path, 'r') as file:
        profile_data = json.load(file)
    most_recent_experience = getMostRecentExperience(data)
    if isValidRole(profile_data, most_recent_experience) is False:
        return 
    fit_rating = analyze_profile_fit(profile_data)
    print(f"Profile Fit Rating: {fit_rating}")


if __name__ == "__main__":
    main()
