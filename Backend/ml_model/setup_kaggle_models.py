import sys
try:
    import kagglehub
except ImportError:
    print("Please install kagglehub: pip install kagglehub")
    sys.exit(1)

def download_datasets():
    print("Downloading Plant Disease Dataset...")
    try:
        plant_disease_path = kagglehub.dataset_download("emmarex/plantdisease")
        print("✅ Path to Plant Disease dataset files:", plant_disease_path)
    except Exception as e:
        print("❌ Error downloading Plant Disease dataset:", e)

    print("\nDownloading Scene Classification Dataset...")
    try:
        scene_class_path = kagglehub.dataset_download("nitishabharathi/scene-classification")
        print("✅ Path to Scene Classification dataset files:", scene_class_path)
    except Exception as e:
        print("❌ Error downloading Scene Classification dataset:", e)

    print("\nDownloads complete. You can now use these datasets to train the local Bloomify models.")

if __name__ == "__main__":
    download_datasets()
