package buzzbingo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.NOT_FOUND,reason="This wordbank does not exist")
public class WordbankNotFoundException extends Exception {
}
