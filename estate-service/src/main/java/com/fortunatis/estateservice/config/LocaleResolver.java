package com.fortunatis.estateservice.config;

import com.fortunatis.estateservice.enums.Languages;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

import java.util.Locale;
import java.util.stream.Stream;

@Configuration
public class LocaleResolver extends AcceptHeaderLocaleResolver {
    @Override
    public @NotNull Locale resolveLocale(@NotNull HttpServletRequest request) {
        if (!StringUtils.isEmpty(request.getHeader("Accept-Language"))) {
            String locale = request.getHeader("Accept-Language");
            if (Stream.of(Languages.values()).anyMatch(lang -> lang.getValue().equalsIgnoreCase(locale))) {
                return new Locale(locale);
            }
        }
        return Locale.US;
    }
}
