import pandas as pd 
import json
import pandas as pd 

df = pd.read_csv('final_move_df.csv')

df_unique = df.drop_duplicates(subset='ID')

id_config_dict = pd.Series(df_unique.config.values, index=df_unique.ID).to_dict()

output_file = 'configs.json'
with open(output_file, 'w') as f:
    json.dump(id_config_dict, f, indent=4)

print(f"Data written to {output_file}")

