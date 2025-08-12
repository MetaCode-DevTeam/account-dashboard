package checkValidations

import (
	"errors"
	"image"
	"io"
)

// valid format | میشه به عنوان ورودی تابع هم باشه که انعطاف پذیر باشه
var validFormats = []string{"jpg", "jpeg", "png", "webp"}

func PictureValidation(height, width int, file *io.Reader) error {
	config, s, err := image.DecodeConfig(*file)
	if err != nil {
		return err
	}

	if config.Width != width || config.Height != height {
		return errors.New("image width and height must be the same")
	}

	isValid := false

	for _, val := range validFormats {
		if val == s {
			isValid = true
			break
		}
	}

	if isValid {
		return nil
	}

	return errors.New("invalid format")
}

// نحوه استفاده
//pic,_ := c.FormFile("key")
//ioReader , _ := pic.Open()
//err := PictureValidation(300 , 300 ,ioReader)
// if err {
//	return c.JSON(bad request ,gin.H{formatNotTrue})
//}
// شبه کده ممکنه جایی خطای کامپایل بگیره
