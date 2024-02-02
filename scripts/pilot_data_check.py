import pandas as pd
import json


# Load the Excel file
file_path = 'pilot_game_data.xlsx'
df = pd.read_excel(file_path) #, nrows=150

df['combinedToAndFrom'] = df.apply(lambda x: [int(coord.strip()) for coord in x['combinedToAndFrom'][1:-1].split(',')], axis=1)



# Group by 'playerId' and 'goal', then aggregate the required information
grouped = df.groupby(['playerId', 'goal']).agg({
    # should be player Id with list of GameIds
    'combinedToAndFrom': lambda x: list(x),
    'importId': 'first',  # Add any other fields you need here
    'initBoardRecord': 'first',
}).reset_index()

result_dict = {}
for _, row in grouped.iterrows():
    try:
        # Attempt to convert playerId to integer and then to string
        player_id = str(int(row['playerId']))
    except ValueError:
      
        # print(f"Failed to convert playerId to int for row: {row}")
        continue
    goal = row['goal']

    import_id = row['importId']
    if pd.isna(import_id):
        import_id = 0  
    else:
        import_id = int(import_id)

    if player_id not in result_dict:
        result_dict[player_id] = []

    
    config = [] 
    

    game_dict = {
        "id": player_id,
        "importId": import_id,  
        
        "config": config,
        "goal_optimal": 13,
        "goal": goal,
        "total_moves": 13, 

        # check if this works for all types
        "goal_type": goal.split()[0],
        "move_ids": row['combinedToAndFrom'],
    }

    result_dict[player_id].append(game_dict)
    
#result_dict now contains the transformed data
# print(result_dict)

# Write the dictionary to a JSON file
output_file = 'output.json'
with open(output_file, 'w') as f:
    json.dump(result_dict, f, indent=4)

print(f"Data written to {output_file}")