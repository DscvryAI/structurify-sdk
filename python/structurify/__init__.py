"""
Structurify SDK for Python

Official Python SDK for the Structurify document extraction API.

Copyright (c) 2026 REDSCVRY TECHNOLOGY PRIVATE LIMITED
Licensed under the MIT License.
"""

from structurify.client import Structurify
from structurify.exceptions import (
    StructurifyError,
    AuthenticationError,
    RateLimitError,
    NotFoundError,
    ValidationError,
    InsufficientCreditsError,
)

__version__ = "1.0.0"
__author__ = "REDSCVRY TECHNOLOGY PRIVATE LIMITED"
__license__ = "MIT"

__all__ = [
    "Structurify",
    "StructurifyError",
    "AuthenticationError",
    "RateLimitError",
    "NotFoundError",
    "ValidationError",
    "InsufficientCreditsError",
]
