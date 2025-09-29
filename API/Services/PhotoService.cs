using System.Threading.Tasks;
using API.Helpers;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace API.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;
        public PhotoService(IOptions<CloudinarySettings> config)
        {
            if (string.IsNullOrEmpty(config.Value.CloudName) || string.IsNullOrEmpty(config.Value.ApiKey) || string.IsNullOrEmpty(config.Value.ApiSecret))
            {
                _cloudinary = null;
            }
            else
            {
                var acc = new Account(
                    config.Value.CloudName,
                    config.Value.ApiKey,
                    config.Value.ApiSecret
                );
                _cloudinary = new Cloudinary(acc);
            }
        }

        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            if (_cloudinary == null)
            {
                // Mock result for local development, use local assets/user.png
                uploadResult.Url = new System.Uri("/assets/user.png", System.UriKind.Relative);
                uploadResult.PublicId = "mock_public_id";
                return uploadResult;
            }
            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uplodParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
                };
                uploadResult = await _cloudinary.UploadAsync(uplodParams);
            }
            return uploadResult;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            
            if (_cloudinary == null)
            {
                // Mock result for local development
                return new DeletionResult { Result = "ok" };
            }
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result;
        }
    }
}