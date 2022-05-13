import unicodedata
from typing import Iterable, List


def tags_sanitize(tag_list: Iterable[str]) -> List[str]:
    if tag_list is None:
        return []
    sanitized_strs = map(tag_sanitize, tag_list)
    non_zero_length_strs = (s for s in sanitized_strs if len(s) > 0)
    return list(non_zero_length_strs)


def tag_sanitize(tag: str) -> str:
    tag = unicodedata.normalize("NFC", tag)
    tag = tag.strip()
    tag = tag.lower()
    return tag
